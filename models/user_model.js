var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new mongoose.UserSchema({
	username: String,
	password: String,
	category1: {
		correct: Number,
		total: Number
	},	
	category2: {
		correct: Number,
		total: Number
	},	
	category3: {
		correct: Number,
		total: Number
	},
	category4: {
		correct: Number,
		total: Number
	}		
});
//user stats
userSchema.methods.userCategoryStats = function(correct, total) {
	if(err) return err;
	this.category = category;
	this.correct = correct;
	this.total = total;
	var average = correct/total;
	return average;
};

module.exports = mongoose.model('User', userSchema);