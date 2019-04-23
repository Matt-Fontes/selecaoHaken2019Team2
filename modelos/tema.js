var mongoose = require('mongoose');

var tema = new mongoose.Schema({
  nome: {type: String,  trim: true},
  date: {type: date},
});

module.exports = mongoose.model('tema', tema);
