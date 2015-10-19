var Category = require(__dirname + '/../models/category');
var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');

var categoriesRoute = module.exports = exports = express.Router();

categoriesRoute.get('/categories', jsonParser, function (req, res) {
  Category.find({questions: req.category.questions.question}, function (err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});