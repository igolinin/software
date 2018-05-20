// book controller routes
var express = require('express');
var router = express.Router();
var Message = require('../models/Message')
const mongoose = require('mongoose');

// get /api/book/
router.get('/',(req,res) => {
  Message.find({}).exec().then((result=>{res.json(result);console.log(result);}))
  
});

// post /api/book/
router.post('/',(req,res) => {
  var newMessage = new Message();
  newMessage.email = req.body.email;
  newMessage.msg = req.body.msg;
  newMessage.save();
  res.send('success')
  console.log(req.body);
});

// put /api/book/
router.put('/',(req,res) => {
  res.send('PUT response');
});

// delete /api/book/
router.delete('/',(req,res) => {
  res.send('DELETE response');
});

module.exports = router;