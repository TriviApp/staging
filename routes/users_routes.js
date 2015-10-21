var express = require('express');
var User = require(__dirname + '/../models/user_model');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_errors');
var handleResponse = require(__dirname + '/../lib/handle_response');
var passport = require('passport');
var basicAuth = require(__dirname + '/../lib/strategies/passport_basic_strategy');
var bearerAuth = require(__dirname + '/../lib/strategies/passport_bearer_strategy');

var usersRouter = module.exports = exports = express.Router();
usersRouter.use(passport.initialize());

usersRouter.post('/signup', jsonParser, function(req, res) {
  var newUser = new User();
  newUser.username = req.body.username;
  newUser.generateHash(req.body.password, function(err, hash) {
    if (err) return handleError.err500(err, res);
    newUser.generateToken(function(err, token) {
      if (err) return handleError.err500(err, res);
      newUser.token = token;
      newUser.save(function(err, data) {
        if (err) return handleError.err500(err, res);
        delete data.password;
        handleResponse.send201(res, data);
      });
    });
  });
});

usersRouter.get('/signin', basicAuth.basicAuthentication, function(req, res) {
  console.log('inside signin route: ', req.headers);
  var user = req.user;
  delete user.password;
  handleResponse.send200(res, user);
});

usersRouter.get('/username', bearerAuth.bearerAuthentication, function(req, res) {
  res.json({username: req.user.username});
});

var authenticate = function(req, res, next) {
  basicAuth.basicAuthentication
}






