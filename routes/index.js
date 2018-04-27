module.exports = function (io) {

  var express = require('express');
  var router = express.Router();
  var path = require('path');

  /**
   * Socket.io
   */
  io.on("connection", function () {
    
  });

  /* GET home page. */
  router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  return router;
}
