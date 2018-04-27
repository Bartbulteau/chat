module.exports = function (io) {

  var express = require('express');
  var router = express.Router();

  /**
   * Socket.io
   */
  io.on("connection", function () {
    
  });

  /* GET home page. */
  router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
  });

  return router;
}
