var mongoose = require('mongoose');

var blockedUsersSchema = mongoose.Schema({
	blocker : String,
	blockee : String,
	blockdate : Date
});

module.exports = mongoose.model('blockedUsers', blockedUsersSchema);
