var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
	author : String,
	body : String,
	date : {type : Date}	
});


var postSchema = mongoose.Schema({
	account_name : String,
	author : String,
	msg : {type : String},
	comments : [commentSchema],
	attachment : String,
	postdate : {type : Date}
});

postSchema.index({postdate: 1});

module.exports = mongoose.model('posts', postSchema);