var mongoose = require('mongoose');

var professor = new mongoose.Schema({
  nome: {type: String,  trim: true},
  senha: {type: String, trim: true}
});

module.exports = mongoose.model('professor', professor);
