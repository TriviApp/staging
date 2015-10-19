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
	Category.count().exec(function(err, count) {
		var random = Math.floor(Math.random() * count)
		Category.findOne().skip(random).exec(function(err, question) {
			if(err) return handleError(err, res);
			res.json(question);
		});
	});
});		 }
		({question: req.category.questions}, function(err, data) {
		if (err) return err;
		res.json(res.questions.question);
	});
});
//there will need to be a getAll() on the app side to grab all 

gamePlayRoute.get('/category:id', jsonParser, function(req, res) {
	Category._sample/_shuffle({})
})
gamePlayRoute.post('/category:id', jsonParser, function(req, res) {

})

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
