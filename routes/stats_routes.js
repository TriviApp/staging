var Stats = require(__dirname + '/../models/stats'); // I think this will be in UserModel
var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');

var statsRoute = module.exports = exports = express.Router();

statsRoute.get('/stats', jsonParser, function (req, res) {
  Stats.find({placeholder}, function (err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

statsRoute.post('/stats', jsonParser, function (req, res) {
  var newStats = new Stats(req.body);
  newStats.placeholder = placeholder;
  newStats.save(function (err, data) {
    if (err) handleError(err, res);
    res.json(data);
  });
});