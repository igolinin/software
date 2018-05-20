const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
  email: String,
  msg: String,
}, {collection:'software'});

module.exports = mongoose.model('Message', MessageSchema);