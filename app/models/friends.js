var friendsSchema = mongoose.Schema({
		user1 : String,
		user2 : String,
		datemade : String,
		accepted : {type: String, default : '0', enum : ['0','1'] }
	});

