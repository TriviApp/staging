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
  Category.find({ category: req.params.category }, function (err, data) {
    if (err) return handleError.err500(err, res);
    var questions = _.sample(req.questions, 5);
    handleRes.send200(res, questions);
  });
});
