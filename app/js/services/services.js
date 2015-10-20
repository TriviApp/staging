module.exports = function(app) {
	require(__dirname + './auth_service')(app);
  require(__dirname + './game_service')(app);
};
