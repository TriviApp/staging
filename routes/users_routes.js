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
  newUser.avatar = req.body.avatar;
  var winLoss = {
    correct: 0,
    total: 0
  };
  newUser.category1 = winLoss;
  newUser.category2 = winLoss;
  newUser.category3 = winLoss;
  newUser.category4 = winLoss;
  newUser.generateHash(req.body.password, function(err, hash) {
    if (err) return handleError.err500(err, res);
    newUser.generateToken(function(err, token) {
      if (err) return handleError.err500(err, res);
      newUser.token = token;
      newUser.save(function(err, data) {
        if (err) return handleError.err500(err, res);
        var user = data.toObject();
        delete user.password;
        console.log('signup route saved user: ', user);
        handleResponse.send201(res, user);
      });
    });
  });
});

usersRouter.get('/signin', basicAuth.basicAuthentication, function(req, res) {
  var user = req.user.toObject();
  delete user.password;
  console.log('signin route toObject var: ', user);
  handleResponse.send200(res, user);
});

usersRouter.get('/username', bearerAuth.bearerAuthentication, function(req, res) {
  var user = req.user.toObject();
  delete user.password;
  console.log('username route toObject var: ', user);
  handleResponse.send200(res, req.user)
});

usersRouter.get('/errRoute', function(req, res) {
  res.append('WWW-Authenticate', 'Bad authentikitty!');
  handleError.err401(null, res);
});






