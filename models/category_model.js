var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var categorySchema = new mongoose.Schema({
	category: Number, 
	questions: [{
			id: Number, 
			question: String,
			answer_1: String,
			answer_2: String,
			answer_3: String,
			correctAnswer = String
		}] 
});

// methods for tracking wrong or right per game

module.exports = mongoose.model('Category', categorySchema);

