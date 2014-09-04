var validation = require('./validate');
var activate = require('../config/activate');
var authenticate = require('../app/authenticate');
var fs = require('fs-extra');
var models = require('./models/');
var isEmpty = require('./empty');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
require('mongoose-query-paginate');

module.exports = function(app, passport){


app.get('*', function(req,res){
	res.render('index');
}); 



//SET UP RESTFUL SERVICES


app.post('/api/userdata',function(req,res){
	models.User.findOne({ 'local.username' : { $regex : new RegExp(["^",req.body.username,"$"].join(""),"i") } }, function(error, user){
		if(error)
			return console.log(error);

		var userData = {
			name : user.local.fname + " " +user.local.lname,
			dp : user.local.dp,
			username : user.local.username
		}
		res.json(userData);
	})
});


app.post('/activate/:userid/:username/:email', function(req,res){
	var id = req.params.userid;
	var emailToCheck = req.params.email;
	var usernameToCheck = req.params.username;

	activate(id,emailToCheck,usernameToCheck,res);

});


app.post('/user/post',function(req, res){
	if(req.user){
		(!isEmpty(req.body)) ? function(){
		var author = req.user.local.username;
		var toUser = req.body.to;
		var attachment = req.body.attachment;
		var msg = req.body.msg;
		var page = req.body.page;
		var postObj = new models.posts();
		postObj.account_name = toUser;
		postObj.author = author;
		postObj.postdate = Date.now();
		postObj.msg = msg;
		if(req.body.attachment){
			postObj.attachment = attachment;
		}
		var comments = {};

		postObj.save(function(err){
			if(err)
				return console.log(err);
			postObj.comments.push(comments);

		/*postObj.model('posts').find({'account_name' : { $regex : new RegExp(["^",req.user.local.username,"$"].join(""),"i") } }).sort({postdate:'desc'}).exec(function(err,data){
			if(err)
				return console.log(err);
			return res.json(data);
		});*/
	
				var appendedData = function(){
				var inserted = 0;
				var d=[];
				for(var i=1; i<=page; i++){
				var options = {perPage : 2, page: i};
				var query = models.posts.find({'account_name': {$regex : new RegExp(["^",toUser,"$"].join(""),"i")}}).sort({postdate:'desc'});
				query.paginate(options, function(err, data) {
	  			d.push(data.results);
	  			/*process.nextTick(function(){ 
				for(var i=0; i<d.length; i++){
				
				}
				});*/
				if(++inserted==page){
					res.json(d);
				}
				});
				}
			}()
		})



		}() :
		function(){
		var obj = req.files.file;
		var objSaved = {
			path : 'uploads/'+obj.path.substring(8,obj.path.length),
			savePath : './public/users/'+req.user.local.username+'/postData/'+obj.name,
		};

		fs.move(objSaved.path, objSaved.savePath, function (err) {
  		if (err) {
    	throw err;
 		 }
		});
		res.send(objSaved.savePath);
		}();
	}							
});

//FETCHING USER STATUSES FROM DATABASE
app.post('/api/status', function(req,res){
	if(req.user){
	var queryObj = req.body.user;
	var pageNumber = function(){
		return (req.body.page!=undefined) ? req.body.page : 1;
	}();
	var docsPerPage = 2;

	var options = {
  	perPage: docsPerPage,
  	page   : pageNumber
	};
	var query = models.posts.find({'account_name': {$regex : new RegExp(["^",queryObj,"$"].join(""),"i")}}).sort({postdate:'desc'});
	query.paginate(options, function(err, data) {
	  return res.json(data.results);
	});
	


	/*models.posts.find({'account_name': {$regex : new RegExp(["^",queryObj,"$"].join(""),"i")}}).sort({postdate:'desc'}).exec(function(err,data){
		if(err)
			return console.log(err);
		res.json(data);
	});*/
	}

});

//COMMENTING ON POST
app.post('/api/comment', function(req,res){
	if(req.user){
		if(!isEmpty(req.body.msg)){
			var postid = ObjectId(req.body.postid);
			var account = req.body.To;
			var page = req.body.page;
			models.posts.findById({'_id' : postid}, function(err,post){
			if(err)
			return console.log(err);
			var comment = {
			author : req.user.local.username,
			body : req.body.msg,
			date : Date.now()
			};
			post.comments.push(comment);

			post.save(function(err){
				if(err)
					console.log(err);

			//Returning post body containing updated comment
			/*models.posts.model('posts').find({'account_name': {$regex : new RegExp(["^",account,"$"].join(""),"i")}}).sort({postdate:'desc'}).exec(function(err,posts){
			if(err)
			return console.log(err);
			res.json(posts);
			});*/

				var appendedData = function(){
				var inserted = 0;
				var d=[];
				for(var i=1; i<=page; i++){
				var options = {perPage : 2, page: i};
				var query = models.posts.find({'account_name': {$regex : new RegExp(["^",account,"$"].join(""),"i")}}).sort({postdate:'desc'});
				query.paginate(options, function(err, data) {
	  			d.push(data.results);
	  			/*process.nextTick(function(){ 
				for(var i=0; i<d.length; i++){
				
				}
				});*/
				if(++inserted==page){
					res.json(d);
				}
				});
				}
			}()

			})
	})
  }
}	
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

app.delete('/api/post', function(req,res){
	if(req.user){
		var postid = ObjectId(req.body.postid),
		account = req.body.account,
		page = req.body.page;
		var d = [];
		models.posts.model('posts').findById({_id: postid},function(err,post){
			post.remove();
			post.save(function(err){
				if(err)
					return console.log(err);
					/*models.posts.model('posts').find({'account_name': {$regex : new RegExp(["^",account,"$"].join(""),"i")}}).sort({postdate:'desc'}).exec(function(err,posts){
					if(err)
					return console.log(err);
					return res.json(posts);
					});*/

						//USE PAGINATION TO FETCH UP TO THE CURRENT PAGE APPENDING RESULTS TO A LOOP
				var appendedData = function(){
				var inserted = 0;
				for(var i=1; i<=page; i++){
				var options = {perPage : 2, page: i};
				var query = models.posts.find({'account_name': {$regex : new RegExp(["^",account,"$"].join(""),"i")}}).sort({postdate:'desc'});
				query.paginate(options, function(err, data) {
	  			d.push(data.results);
	  			/*process.nextTick(function(){ 
				for(var i=0; i<d.length; i++){
				
				}
				});*/
				if(++inserted==page){
					res.json(d);
				}
				});
				}
			}()


			})
		})
	}
});

app.delete('/api/comment', function(req,res){
	if(req.user){
			var postid = ObjectId(req.body.postid),
			commentid = ObjectId(req.body.id),
			page = req.body.page,
			account = req.body.account;
			models.posts.model('posts').findById({_id : postid}, function(err, post){
			if(err)
			return console.log(err);
			post.comments.remove({'_id':commentid});
			post.save(function(err){
			if(err)
				return console.log(err);
			/*models.posts.model('posts').find({'account_name': {$regex : new RegExp(["^",account,"$"].join(""),"i")}}).sort({postdate:'desc'}).exec(function(err,posts){
				if(err)
					return console.log(err);
				return res.json(posts);
			});*/
			//USE PAGINATION TO FETCH UP TO THE CURRENT PAGE APPENDING RESULTS TO A LOOP
			var appendedData = function(){
				var d = [];
				var inserted = 0;
				for(var i=1; i<=page; i++){
				var options = {perPage : 2, delta: 3, page: i};
				var query = models.posts.find({'account_name': {$regex : new RegExp(["^",account,"$"].join(""),"i")}}).sort({postdate:'desc'});
				query.paginate(options, function(err, data) {
	  			d.push(data.results);
				/*process.nextTick(function(){ 
					for(var i=0; i<d.length; i++){
						res.json(d[i]);
					}
				});*/
				if(++inserted==page){
					res.json(d);
				}
				});
				}
				
			}()
			})
			})
	}

});

return;
};


