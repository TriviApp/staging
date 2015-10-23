var Category = require(__dirname + '/../models/category_model');
var express = require('express');
var sample = require('lodash.sample');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_errors');
var handleRes = require(__dirname + '/../lib/handle_response');
var passport = require('passport');
var bearerAuth = require(__dirname + '/../lib/strategies/passport_bearer_strategy');
var _ = require('lodash');

var categoryRouter = module.exports = exports = express.Router();
categoryRouter.use(passport.initialize());

categoryRouter.get('/categories/:category', bearerAuth.bearerAuthentication, function (req, res) {
  Category.findOne({category: req.params.category}, function (err, data) {
    if (err) return (err, res);
    console.log('cat', req.params.category);
    console.log('data pre sample', data.questions);
    var data = [
	 		{"question":"Which NHL Team are nicknamed the 'Coyotes'?", "answers": ["Calgary", "Vancouver", "Ottawa", "Arizona"], "correctAnswer": "Arizona"},
	 		{"question":"Which U.S. golfer stands second in the all-time list of major winners with thirteen titles?", "answers": ["Tiger Woods", "Tony Jacklin", "Bobby Jones", "Arnold Palmer"], "correctAnswer": "Bobby Jones"},
	 		{"question":"Chukkas is the term given to periods played in what sport?", "answers": ["Polo", "Ice Hockey", "Hockey", "Curling"], "correctAnswer": "Polo"},
	 		{"question":"How many goose feathers does it take to make a shuttlecock?", "answers": ["16", "60", "21", "32"], "correctAnswer": "16"},
	 		{"question":"In Olympic Archery, how far is the competitor from the target?", "answers": ["50m", "120m", "70m", "100m"], "correctAnswer": "70m"}
	 		];
    var questions = _.sample(data, 2);
    console.log('questions', questions);
    res.json({msg: questions});
  });
});
