var User = require('../app/models/users');

module.exports = function(id,emailToCheck,usernameToCheck,res){

	//AUTHENTICATING USER EMAIL ADDRESS AND UPDATING THE ACTIVATED VALUE IN DATABASE
		passReqToCallBack : true;
		
		User.findOne({ "local.username" : { $regex : new RegExp(usernameToCheck, "i") } },function(err, user) {
            if(err)
            	throw err;
            //console.log(user);
            if(user){
            if(user.local.email == emailToCheck && user.local.username == usernameToCheck && user._id == id){
            	user.local.activated = 1;
            	user.save(function(err){
            		if(err)console.log(err);
            		res.send('successfully activated..you will be redirected to login page in a second');
            	});
            }
            }
            else{
            	res.send('Sorry user does not exist in our system...try again later');
            }
        });

};
