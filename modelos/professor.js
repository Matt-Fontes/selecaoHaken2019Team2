var mongoose = require('mongoose');

var tema = new mongoose.Schema({   
  nome: {type: String,  trim: true},
  senha: {type:},
});

module.exports = mongoose.model('professor', professor);