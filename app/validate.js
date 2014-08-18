var User = require('./models/users');



module.exports = function(type,element,res){
	passReqToCallBack : true;
	if(type == 'username'){

		User.findOne({'local.username': element},function(err, user) {
            if(err)
            	throw err;
            //console.log(user);
            if(user){
            	res.send('username exists');
            }
            else{
            	res.send('permit');
            }
    
        });

	};

	if(type =='email'){
		User.findOne({'local.email': element},function(err, user) {
            if(err)
            	throw err;
            //console.log(user);
            if(user){
            res.send('email exists');
            }
            else{
            	res.send('permit');
            }
        });
	};

	 
};

