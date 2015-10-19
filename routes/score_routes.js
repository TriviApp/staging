var Score = require(__dirname + '/../models/score'); // will be tracked in categories
var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');

var scoreRoute = module.exports = exports = express.Router();

scoreRoute.get('/score', jsonParser, function (req, res) {
  Score.find({placeholder}, function (err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

scoreRoute.post('/score', jsonParser, function (req, res) {
  var newScore = new Score(req.body);
  newScore.placeholder = placeholder;
  newScore.save(function (err, data) {
    if (err) handleError(err, res);
    res.json(data);
  });
});