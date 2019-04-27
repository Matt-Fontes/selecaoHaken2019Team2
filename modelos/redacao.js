var mongoose = require('mongoose');

var tema = new mongoose.Schema({
  titulo: {type: String, trim: true},
  name: {type: String, trim: true},
  aluno: {type: String, trim:true},
  email: {type: String, trim:true},
  hoje: {type: String, trim:true}
});

module.exports = mongoose.model('redacao', redacao);
