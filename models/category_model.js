var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var categorySchema = new mongoose.Schema({
	category: String, 
	questions: [{
			question: String,
			answers: [String],
			correctAnswer: String,
		}] 
});

cat.questions.question.answer.answer1

module.exports = mongoose.model('Category', categorySchema);

