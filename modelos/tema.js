var mongoose = require('mongoose');

var Tema = new mongoose.Schema({
  nome: {type: String,  trim: true},
  hoje: {type: String, trim: true},
  url: {type: String, trim:true}
});

module.exports = mongoose.model('Tema', Tema);
