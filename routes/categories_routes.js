var Category = require(__dirname + '/../models/category_model');
var express = require('express');
var sample = require('lodash.sample');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');

var categoriesRoute = module.exports = exports = express.Router();

categoriesRoute.get('/categories', jsonParser, function (req, res) {
  Category.find({category: req.category}, function (err, data) {
    if (err) return handleError(err, res);
    var questions = _.sample(data, 5);
    res.json(questions); //lodash sample
  });
});
