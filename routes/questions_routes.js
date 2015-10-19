var Note = require(__dirname + '/../models/question');
var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');

var questionsRoute = module.exports = exports = express.Router();

questionsRoute.get('/questions', jsonParser, function(req, res) {
  Question.find({author: req.user.username}, function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

