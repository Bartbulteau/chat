module.exports = function (io) {
    var express = require('express');
    var router = express.Router();

    // set-up database
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://bart:20BarT01@ds159509.mlab.com:59509/chat')
    var db = mongoose.connection;

    // check connection
    db.once('open', function () {
        console.log('Connected to MongoDB');
    });

    db.on('error', function (err) {
        console.log(err);
    });

    // bring in model
    var Message = require('../models/message');


    /**
    * Socket.io
    */
    io.on("connection", function (socket) {
        // events

        socket.on('get_messages', function() {
            console.log('get_messages');
            Message.find({}, (err, messages) => {
                if (err) {
                  console.log('ERROR /!\\ : ');
                  console.log(err);
                  socket.emit('post_message_fail', err);
                }
                else {
                  console.log(messages);
                  socket.emit('messages', messages);
                }
            });
        });


        socket.on('post_message', function (msg) {
            var message = new Message();
            message.content = msg.content;
            message.author = msg.author;

            // save message to db
            message.save(err => {
                // check if it works
                // if it doesn't, send the error
                if (err) {
                    console.log(err);
                    socket.emit('post_message_fail', err);
                }
                // if it does, send the messages
                else {
                    console.log('New message posted by ' + msg.author);
                    io.emit('new_message', msg);
                }
            });
        });


    });



    // no matter what /api/... page you ask, you will see this :
    router.get('*', function (req, res, next) {
        res.send('API route');
    });

    return router;
}