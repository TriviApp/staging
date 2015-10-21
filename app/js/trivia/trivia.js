module.exports = function(app) {
  require('./controllers/trivia_controller')(app);
  require('./directives/question_directive')(app);
  require('./directives/result_list_directive')(app);
};	