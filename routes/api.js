module.exports = function (io) {
    var express = require('express');
    var router = express.Router();

    // set-up database
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://bart:20BarT01@ds255329.mlab.com:55329/m2w');
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
        socket.on('post_message', function(data) {
            //save in database
            io.broadcast('new_message', data);
        });
    });



    // no matter what /api/... page you ask, you will see this :
    router.get('*', function (req, res, next) {
        res.send('API route');
    });

    return router;
}