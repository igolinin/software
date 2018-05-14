const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
  title: String,
  author: String,
  price: Number,
});

module.exports = mongoose.model('Book', BookSchema);