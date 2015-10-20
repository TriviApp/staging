var User = require(__dirname + '/../../models/user_model');
var passport = require('passport');
var basicStrategy = require('passport-http').BasicStrategy;

passport.use(new basicStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) return done(err);
      if (!user) return done(null, false);
      user.compareHash(password, function(err, hashRes) {
        if (err) return done(err);
        return hashRes ? done(null, user) : done(null, false);
      });
    });
  }
));

exports.basicAuthentication = passport.authenticate('basic', { session: false });
