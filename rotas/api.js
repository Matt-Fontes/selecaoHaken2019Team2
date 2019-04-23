var express = require('express');
var router = express.Router();

const Professor = require('../modelos/professor');

router.get('/professor', (req, res) => { //quando digitar localhost:3000/api/profile ira aparecer todos os perfis em formato json
  Professor.find()
  .then(professor => {
    res.json({
      confirmation: 'success',
      data: professor
    });
  })
  .catch(err => {
    res.json({
      confirmation: 'fail',
      message: err.message
    })
  })
});


router.post('/professor', (req, res) => {
   Professor.create(req.body)
  .then(professor => {
    res.json({
      confirmation: 'success',
      data: professor
    })
  })
  .catch(err => {
    res.json({
      confirmation: 'fail',
      message: err.message
    })
  })













/*
  res.json({
    confirmation: 'success',
    data: req.body
  })
  */
});


/*router.post('/', (req, res) => {
  Usuario.create(req.body);
  res.render("index.ejs");
});

router.get('/:nome', (req, res) => {
  var oi = req.params.nome;
  res.send(oi);
});*/


module.exports = router;
