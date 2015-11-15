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
		total: Number,
    rating: Number
	},
	entertainment: {
		correct: Number,
		total: Number,
    rating: Number
	},
	history: {
		correct: Number,
		total: Number,
    rating: Number
	},
	science: {
		correct: Number,
		total: Number,
    rating: Number
	}
});

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
