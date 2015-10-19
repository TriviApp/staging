var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var eat = require('eat');

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

userSchema.methods.generateHash = function(pw, cb) {
  bcrypt.hash(pw, 8, function(err, hash) {
    if (err) return cb(err);
    this.password = hash;
    cb(null, hash);
  }.bind(this));
};

userSchema.methods.compareHash = function(pw, cb) {
  bcrypt.compare(pw, this.password, cb);
};

userSchema.methods.generateToken = function(cb) {
  eat.encode({ id: this._id }, process.env.APP_SECRET, cb);
};

module.exports = mongoose.model('User', userSchema);
