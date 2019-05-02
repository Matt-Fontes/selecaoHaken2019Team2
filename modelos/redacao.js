var mongoose = require('mongoose');

var Redacao = new mongoose.Schema({
  titulo: {type: String, trim: true},
  name: {type: String, trim: true},
  aluno: {type: String, trim:true},
  email: {type: String, trim:true},
  hoje: {type: String, trim:true},
  tema: {type: String, trim:true},
  status: {type: String, trim:true}
});

module.exports = mongoose.model('Redacao', Redacao);
