var express     = require('express');
var bodyParser  = require('body-parser');
var configDB = require('./config/database.js');
var mongoose = require('mongoose');


// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database
mongoose.connection.on('connected',()=>{
    console.log('Connecected to mongoDB')
});
mongoose.Promise = global.Promise;

var app         = express(); // Please do not remove this line, since CLI uses this line as guidance to import new controllers


var bookController = require('./controllers/bookController');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/book', bookController);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running');
});