var validation = require('./validate');
var activate = require('../config/activate');
var authenticate = require('../app/authenticate');
var fs = require('fs');
module.exports = function(app, passport){

app.get('*', function(req,res){
	res.render('index');
});



//SET UP RESTFUL SERVICES


app.post('/api/userdata',function(req,res){
	res.send('user resolved');
});


app.post('/activate/:userid/:username/:email', function(req,res){
	var id = req.params.userid;
	var emailToCheck = req.params.email;
	var usernameToCheck = req.params.username;

	activate(id,emailToCheck,usernameToCheck,res);

});


app.post('/signup', function(req, res, next) {
  passport.authenticate('local-signup', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.send('signup failure'); }
    req.logIn(user, function(err) {
      if (err) { console.log(err) }
      return res.send('signup success');
    });
  })(req, res, next);
});

app.post('/api/login', function(req,res,next){
	passport.authenticate('local-login', function(error, user, message){
		if(error) { return res.send('login failed')};
		if(!user) { return res.send(message); }
		if(user){ 
			req.logIn(user, function(err) {
      		if (err) { console.log(err) }
      		res.send(req.user); 
    		});
		}
		
	})(req,res,next);
});
 

app.post('/api/logout', function(req,res){
		req.logout();
		res.send('success');
});


app.post('/validate/:obj', function(req,res){
	var result;
	if(req.params.obj=='email'){
		var type = req.params.obj;
		var email = req.body.email;
		validation(type,email,res);
	}


	if(req.params.obj=='username'){
		type = req.params.obj;
		var username = req.body.username;
		validation(type,username,res);
		
	};

});






return;
};


