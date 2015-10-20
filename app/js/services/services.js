module.exports = function(app) {
	require(__dirname + '/auth_service.js')(app);
  require(__dirname + '/game_services.js')(app);
};
