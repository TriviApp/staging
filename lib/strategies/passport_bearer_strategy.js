var User = require(__dirname + '/../../models/user_model');
var passport = require('passport');
var bearerStrategy = require('passport-http-bearer');

passport.use(new bearerStrategy(
  function(token, done) {
    User.findOne({ token: token }, function(err, user) {
      if (err) return done(err);
      if (!user) return done(null, false);
      return done(null, user);
    });
  };
));

exports.bearerAuth = passport.authenticate('bearer', { session: false });
