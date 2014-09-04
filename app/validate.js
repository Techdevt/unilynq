'use strict';
var models = require('./models/');



module.exports = function(type,element,res){
	passReqToCallBack : true;
	if(type == 'username'){

		models.User.findOne({ "local.username" : { $regex : new RegExp(["^",element,"$"].join(""),"i") } },function(err, user) {
            if(err)
            	throw err;
            //console.log(user);
            if(user){
            	res.send('username exists');
            }
             else{
            	res.send('other');
            }
    
        });

	};

	if(type =='email'){
		models.User.findOne({ "local.email" : { $regex : new RegExp(["^",element,"$"].join(""),"i") } },function(err, user) {
            if(err)
            	throw err;
            //console.log(user);
            if(user){
            res.send('email exists');
            }
            else{
            	res.send('other');
            }
        });
	};

	 
};

