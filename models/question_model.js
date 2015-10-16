var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var questionSchema = new mongoose.Schema({
	question: String,
	answers: {},
	correctAnswer = String, // will use this to compare answer === correct string
});

module.exports = mongoose.model('Question', questionSchema);