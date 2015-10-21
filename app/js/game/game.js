module.exports = function(app) {
  require('./directives/game_directive')(app);
  require('./controllers/game_controller')(app);
  require('./directives/result_list_directive')(app);
};	