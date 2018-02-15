var mongoose = require('mongoose');

var resultSchema = new mongoose.Schema({
  original_url: String,
  short_url: String
});

module.exports = mongoose.model('Result', resultSchema);