var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');
var categorySelected = require(__dirname + './categories_routes');
var categoryModel = require(__dirname + '/../models/category_model');

var counter = 5;
var right = '';
var wrong = '';

var gamePlayRoute = module.exports = exports = express.Router();

//select random question from category (Get all then lodash to select random)
gamePlayRoute.get('/category:id', jsonParser, function(req, res) {
	Category.find({question: req.category.questions}, function(err, data) {
		if (err) return err;
		res.json(res.questions.question);
	});
});



var selectQuestion = function(data, err) {
    if(err) handleError(err);
    Category.questions.question.find({}, function(err, results) {
        if(err) handleError(err);
        else {callback(results)};
    });
}

//select answer and compare
var checkAnswer = function(data, err) {
    answer = this.answer;
    if(answer === Category.question.correctAnswer) {
    	right += 1;
        return true; // select right answer front end?
    }    
    else {
    	wrong += 1;
    	return false;	
    } 

    counter -= 1;
} 

//add right answers to UserSchema category.right

//add 5 to UserSchema category.total
