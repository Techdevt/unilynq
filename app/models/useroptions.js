var mongoose = require('mongoose');

var userOptionSchema = mongoose.Schema({
	username : String, 
	background : String,
	question : String,
	answer : String,
	temp_pass : String
});


module.exports = mongoose.model('userOption', userOptionSchema);
 