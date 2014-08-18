var validation = require('./validate');
module.exports = function(app, passport){
app.get('*', function(req,res){
	res.render('index');
});

app.post('/login', function(req,res){

	console.log(req.body.username);
	res.send("successful");

});


app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', 
		failureRedirect : '/signup', 
		failureFlash : true 
	}));

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
