module.exports = function(app) {
  require('./controllers/signup_controller')(app);
  require('./controllers/signin_controller')(app);
  require('./controllers/home_controller')(app);
  require('./controllers/scorecard_controller')(app);
  require('./controllers/profile_controller')(app);
};
