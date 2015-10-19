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

module.exports = mongoose.model('Category', categorySchema);

//--------- Categories ------------//
//sports
//history
//entertainment
//science/tech
//global test var


//---------Route Methods ------------//
//module.exports = mongoose.model('Question', questionSchema);

// var handleSuccess = function(callback) {
// 	return function(res) {
// 		callback(null, res.data);
// 	};
// };

// var handleError = function(callback) {
// 	return function(data) {
// 		callback(data);
// 	};
// };

// module.exports = function(app) {
// 	app.factory('GamePlay', function($http) {
// 		var GamePlay = function(gamePlayName) {
// 			this.gamePlayName = gamePlayName;
// 		};


// //select category

//get('category', function () {
	//this.test = catagory array of objects QA
//})


//select random question from catagory

//select answer

//compare answer to correct answer


// 	})
// }
