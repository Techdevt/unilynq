var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
	local : {	
	  fname : String,
	  lname : String,
	  username : {type: String},
	  email : {type: String},
	  password : {type: String},
	  university : {type: String, default: 'Not Set'},
	  gender : {type: String, default : 'F', enum : ['M','F'] },
	  dp : {type: String, default: './img/default.img'},
	  ip : String,
	  bio : String,
	  registration_date : {type : Date, default : Date.now()},
	  lastlogin : Date,
	  notescheck : Date,
	  activated : {type: String, default: 0}
	},

	facebook : {
	   id : String,
	   token : String,
	   email : String,
	   name : String
	},

	google : {
		id : String,
		token : String,
		email : String,
		name : String
	},

	twitter : {
	   id : String,
	   token : String,
	   displayName : String,
	   username : String
	}

	});


	userSchema.methods.generatePassEncrypt = function(password){
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	};

	userSchema.methods.validPassword = function(password){
		return bcrypt.compareSync(password, this.local.password);
	};


	module.exports = mongoose.model('User', userSchema);