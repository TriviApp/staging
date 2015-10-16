var mongoose = require('mongoose');
//include encryption?

var Schema = mongoose.Schema;

var userSchema = new mongoose.UserSchema({
	username: String,
	password: String,
	wins: Number,
	losses: Number
});

module.exports = mongoose.model('User', userSchema);