var mongoose = require('mongoose');

var notificationsSchema = mongoose.Schema({
	username : String,
	initiator : String,
	app : String,
	note : String,
	did_read : {type: String, default : '0', enum : ['0','1'] },
	date_time : Date
});


module.exports = mongoose.model('notifications', notificationsSchema);