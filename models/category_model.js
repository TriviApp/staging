var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var categorySchema = new Schema({
	category: String,
	questions: [{
			question: String,
			answers: [String],
			correctAnswer: String,
		}]
});


module.exports = mongoose.model('Category', categorySchema);

