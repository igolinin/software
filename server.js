var express     = require('express');
var bodyParser  = require('body-parser');
var configDB = require('./config/database.js');
var mongoose = require('mongoose');
var amqp = require('amqplib/callback_api');
var Message = require('./models/Message')


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
app.use('/api/message', bookController);

app.listen(process.env.PORT || 3002, () => {
  console.log('Server is running');
});
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'topic_logs';

    ch.assertExchange(ex, 'topic', {durable: false});

    ch.assertQueue('', {exclusive: true}, function(err, q) {
      console.log(' [*] Waiting for logs. To exit press CTRL+C');

      
        ch.bindQueue(q.queue, ex, '#.software.#');
    

      ch.consume(q.queue, function(msg) {
        console.log(" Recieved [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
        var newMessage = new Message();
        var content = JSON.parse(msg.content.toString());
        newMessage.email = content.email;
        newMessage.msg = content.msg;
        newMessage.save();
      }, {noAck: true});
    });
  });
});