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
    res.render('redacoes.ejs');
});

app.get('/envio', (req, res) => {
    res.render('envio.ejs');
});

app.get('/loginProfessor', (req, res) => {
    res.render('loginProfessor.ejs');
});

app.get('/pageProfessorLinkComplicadoProAlunoNaoSaber', (req, res) => {
    res.render('pageProfessor.ejs');
});


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
  })



app.use(upload());

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
        console.log("File Uploaded",name);
        res.send('Done! Uploading files')
      }
    });
  }
  else {
    res.send("No File selected !");
    res.end();
  };
})


  /*
  MongoClient.connect(uri, function(err, db) {
   db.collection('professors').findOne({ name: req.body.name}, function(err, user) {
     if(user ===null){
       console.log("k");
       //res.end("Login invalido");
     }else if (user.name === req.body.name && user.pass === req.body.pass){
       console.log("wel;l");
       res.render('index.ejs');
       //res.render('completeprofile',{profileData:user);
     } else {
       console.log("Credentials wrong");
       //res.end("Login invalid");
     }
   });
 });*/
});
