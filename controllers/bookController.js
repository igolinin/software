// book controller routes
var express = require('express');
var router = express.Router();
var Book = require('../models/Book')
const mongoose = require('mongoose');

// get /api/book/
router.get('/',(req,res) => {
  Book.find({}).exec().then((result=>{res.json(result);console.log(result);}))
  
});

// post /api/book/
router.post('/',(req,res) => {
  var newBook = new Book();
  newBook.title = req.body.title;
  newBook.author = req.body.author;
  newBook.price = req.body.price;
  newBook.save();
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