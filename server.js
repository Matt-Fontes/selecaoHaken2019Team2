const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var upload = require('express-fileupload');

const app = express();

app.use(express.static(__dirname + '/public')); //Dizendo aonde estao as pastas css, img e js

const uri = "mongodb://localhost:27017/projetoHaken";

mongoose.connect(uri, { useNewUrlParser: true });
const bd = mongoose.connection;
bd.on('error', console.error.bind(console, 'Erro!!'));

app.listen(3000, function() {
    console.log('Servidor Iniciado');
});


app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs');
});


app.get('/redacoes', (req, res) => {
    res.render('pageBlog.ejs');
});

app.get('/envio', (req, res) => {
    res.render('envio.ejs');
});

app.get('/loginProfessor', (req, res) => {
    res.render('loginProfessor.ejs');
});
/*
app.get('/pageProfessorLinkComplicadoProAlunoNaoSaber', (req, res) => {
    res.render('pageProfessor.ejs');
});*/


const professor = require('./rotas/api');
app.use('/api', professor);


const Professor = require('./modelos/professor');
app.post('/login', function(req, res, next){
  Professor.find({'nome': req.body.name, 'senha': req.body.pass}, {}, function(errors, professors){
    if(professors.length > 0)
    {
      res.send('success');
      console.log("Logged In");
    } else {
      res.send('fail');
      console.log("Login Failed")
    }
  });
});



app.use(upload());

const Redacao = require('./modelos/redacao.js');

app.post('/fileUpload',function(req,res){
  console.log(req.files);
  if(req.files.upfile){
    var file = req.files.upfile,
      name = file.name,
      type = file.mimetype;
    var uploadpath = __dirname + '/temp/' + name;
    file.mv(uploadpath,function(err){
      if(err){
        console.log("File Upload Failed",name,err);
        res.send("Error Occured!")
      }
      else {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;
        file.hoje = today;
        file.aluno = req.body.aluno;
        file.tema = req.body.tema;
        file.titulo = req.body.titulo;
        file.email = req.body.email;

        req.body = file;
        console.log("File Uploaded",name);
        res.send('Done! Uploading files')

        Redacao.create(req.body);
      }
    });
  }
  else {
    res.send("No File selected !");
    res.end();
  };
})

app.get('/pageProfessorLinkComplicadoProAlunoNaoSaber', (req, res) => {
  Redacao.find()
  .then(redacaos => {
    res.render('./pageProfessor', { usuarios: redacaos });
  })
  .catch(err => {
    res.json({
      confirmation: 'fail',
      message: err.message
    })
  })
});

app.get('/downloadFile', function(req, res){
  var file = __dirname + '/temp/' + req.query.url;
  res.download(file);
});
