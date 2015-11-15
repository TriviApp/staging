var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var eat = require('eat');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: String,
	password: String,
  token: String,
  avatar: String,
	sports: {
		correct: Number,
		total: Number
	},
	entertainment: {
		correct: Number,
		total: Number
	},
	history: {
		correct: Number,
		total: Number
	},
	science: {
		correct: Number,
		total: Number
	}
});

userSchema.methods.userCategoryStats = function(category) {
  console.log('this.category val: ', this[category]);
  return this[category].correct / this[category].total;
	// this.category = category;
	// var correct = this.correct;
	// var total = this.total;
	// var average = correct/total;
	// return average;
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
  eat.encode({ id: this._id, timeStamp: Date.now() }, process.env.APP_SECRET, cb);
};

module.exports = mongoose.model('User', userSchema);
