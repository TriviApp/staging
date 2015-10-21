var Category = require(__dirname + '/../models/category_model');
var express = require('express');
var sample = require('lodash.sample');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_errors');

var categoryRouter = module.exports = exports = express.Router();

categoryRouter.get('/categories', jsonParser, function (req, res) {
  Category.find({category: req.category}, function (err, data) {
    if (err) return handleError(err, res);
    var questions = _.sample(req.questions, 5);
    res.json({msg: questions}); //lodash sample of five questions
  });	
});
