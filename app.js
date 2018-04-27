var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

/**
 * Socket io
 */
var socket_io = require( "socket.io" );
var io = socket_io();
app.io = io;
// socket.io events
io.on("connection", function(socket) {

});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
var indexRouter = require('./routes/index')(io);
var apiRouter = require('./routes/api')(io);

app.use('/', indexRouter);
app.use('/api', apiRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
  res.status(404).send("Error 404 : \nSorry can't find that!");
});

module.exports = app;
