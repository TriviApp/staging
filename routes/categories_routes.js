var Category = require(__dirname + '/../models/category_model');
var express = require('express');
var sample = require('lodash.sample');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_errors');
var handleRes = require(__dirname + '/../lib/handle_response');
var passport = require('passport');
var bearerAuth = require(__dirname + '/../lib/strategies/passport_bearer_strategy');
var _ = require('lodash');

var categoryRouter = module.exports = exports = express.Router();
categoryRouter.use(passport.initialize());

categoryRouter.get('/categories/:category', bearerAuth.bearerAuthentication, function (req, res) {
  Category.findOne({category: req.params.category}, function (err, data) {
    if (err) return (err, res);
    console.log('req.params', req.params);
    console.log('data pre sample', data.questions);
    var questions = _.sample(data.questions, 5);
    console.log('questions', questions);
    res.json({msg: questions, category: req.params.category});
  });
});
