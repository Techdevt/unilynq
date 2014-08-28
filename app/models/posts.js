var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
	osid : String,
	account_name : String,
	author : String,
	type : String,
	body : String,
	postdate : Date
});

module.exports = mongoose.model('posts', postSchema);