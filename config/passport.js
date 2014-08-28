var LocalStrategy   = require('passport-local').Strategy;
var mailer = require('nodemailer');
var dir = require('mkdirp');
var fs = require('fs');

// load up the user model
var User = require('../app/models/users');
var userOptions = require('../app/models/useroptions');

//Construct mail transporter
var transporter = mailer.createTransport({ 
    service: 'gmail',
    auth: {
        user: 'fanky5g@gmail.com',
        pass: 'fanky2010'
    }
});
 

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

 	

    passport.use('local-signup', new LocalStrategy({
        
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) {
        process.nextTick(function() {

        User.findOne({ 'local.email' : { $regex : new RegExp(email, "i") }  }, function(err, user) {
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, {message : 'That email is already taken.'});
            } else {

				// if there is no user with that email
                // create the user
                var newUser            = new User();
                var options = new userOptions();

                // set the user's local credentials
                newUser.local.email    = email;
                newUser.local.password = newUser.generatePassEncrypt(password);
                newUser.local.username = req.body.username;
                newUser.local.fname = req.body.fname;
                newUser.local.lname = req.body.lname;
                newUser.local.ip = '0.0.0.0';
                newUser.local.lastlogin = Date.now();
                newUser.local.notescheck = Date.now();

                options.username = req.body.username;
                options.background = 'regular';

				// save the user
        		newUser.save(function(err) {
            	if (err)
                throw err;

                //save user into useroptions table
                options.save(function(err){
                    if(err) throw err;
                });

            	//Setting up email variables
            	var emailToSend = email;
                var usernameToInclude = req.body.username;
                var userid = newUser._id;
                var htmlTemplate = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Unilynq | Activation</title></head><body style="margin:0px; font-family:Arial, Helvetica, sans-serif;"><div style="padding:10px; background:#333; font-size:24px; color:#CCC;"><a href="http://www.unilynq.hostoi.com"><img src="http://www.unilynq.com/img/UnilynqLogo.png" width="36" height="30" alt="Unilynq" style="border:none; float:left;"></a>UnilynQ Account Activation</div><div style="padding:24px; font-size:17px;">Hello '+ usernameToInclude +', <br /><br />Click the link below to activate your account: <br /><br /><a href="http://localhost:8080/activate?uid='+userid+'&u='+usernameToInclude+'&e='+email+'">Click here to activate your account now</a><br /><br />Login after successful activation using your:<br />* E-mail Address: <b>'+email+'</b></div></body></html>'
         		var userDirectory = './public/users/'+req.body.username;
         		/*fs.writeFile('authenticate.html',htmlTemplate, function(error){
         			if(err)console.log(err);
         		});*/
               


            	 transporter.sendMail({
    			from: 'unilynq@donotreplyback.com',
    			to: emailToSend,
    			subject: 'Unilynq Activation Message',
   			    html: htmlTemplate
				}, function(error, info){
				if(error){
					//Clear user from database if mail send error occurs
					console.log(error);
				}
				else{
					//Create user directory
					dir(userDirectory,function(err){
						if(err)
							throw new Error(err);
						return done(null, user);
					});
				}
				});	
            	
            	});
            }

        });    

        });

    }));


	passport.use('local-login', new LocalStrategy({
		usernameField : 'username',
		passwordField : 'password',
		passReqToCallback : true
	},
	function(req, username, password, done){		
		process.nextTick(function(){
		User.findOne({'local.email': { $regex : new RegExp(["^",req.body.username,"$"].join(""),"i") }}, function(err, user){
			if(err)return done(err);
			if(!user){
				
				User.findOne({'local.username' : {$regex : new RegExp(["^",username,"$"].join(""),"i")}}, function(err, user){
					if(err) return done(err);
					if(!user) return done(null, false, {message : 'login failed'});
					if(user){
					if(!user.validPassword(password)) return done(null, false, {message : 'wrong password..retry'});
					return done(null, user);
					}
				});
				
			};
			
			if(user){ 
				if(!user.validPassword(password)){
				return done(null, false, {message : 'wrong password..retry'});
			}
			
             else if( user.local.activated != 1){
                return done(null, false, {message : 'user not activated'});
            }

            else{
                return done(null, user);
            }
			}

			
			
		});
 

	});
	}));
};
