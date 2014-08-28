var mongoose = require('mongoose');

var photosSchema = mongoose.Schema({
	user : String,
	gallery : String,
	filename : String,
	description : String,
	uploaddate : Date
});

module.exports = mongoose.model('photos', photosSchema);