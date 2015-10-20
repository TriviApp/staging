module.exports = function(app) {
  require('./controllers/trivia_controller')(app);
  require('./directives/question_directive')(app);
};	