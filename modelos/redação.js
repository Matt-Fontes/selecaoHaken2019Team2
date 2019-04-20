var mongoose = require('mongoose');

var tema = new mongoose.Schema({   
  titulo: {type: String, required: true, trim: true},
});

module.exports = mongoose.model('redacao', redacao);