var express = require('express');
var User = require(__dirname + '/../models/user');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');
var handleResponse = require(__dirname + '/../lib/handle_response');
var passport = require('passport');
var basicAuth = require(__dirname + '/../lib/strategies/passport_basic_strategy');
var bearerAuth = require(__dirname + '/../lib/strategies/passport_bearer_strategy');

var usersRouter = module.exports = exports = express.Router();
usersRouter.use(passport.initalize());

usersRouter.post('/signup', jsonParser, function(req, res) {
  var newUser = new User();
  newUser.username = req.body.username;
  newUser.generateHash(req.body.password, function(err, hash) {
    if (err) return handleError.err500(err, res);
    newUser.save(function(err, data) {
      if (err) return handleError.err500(err, res);
      newUser.generateToken(function(err, token) {
        if (err) return handleError.err500(err, res);
        res.json({token: token});
      });
    });
  });
});

usersRouter.get('/signin', basicAuth.basicAuthentication, function(req, res) {
  var user = req.user;
  delete user.password;
  handleResponse.send201(res, user);
});

usersRouter.get('/username', bearerAuth.bearerAuthentication, function(req, res) {
  res.json({username: req.user.username});
});
