app.factory('authenticationService', ['$http','$q','$window',function($http,$q,$window){
		
			var authenticated = false,

			userInfo = undefined,

			userData;

			function init(){
			var deferred = $q.defer();
			if(angular.isDefined($window.sessionStorage["userInfo"])){
			userInfo = JSON.parse($window.sessionStorage["userInfo"]);

				if(userInfo){
					authenticated = true;
					deferred.resolve(userInfo);
				}
			}
			else{
				userInfo = undefined; 
				authenticated = false;
				deferred.resolve(userInfo);
			}
			return deferred.promise;
			};
 
			var service  = {

			init : function(){return init();},

			isIdentityResolved : function(){
				var deferred = $q.defer();
				deferred.resolve(authenticated);
				return deferred.promise;
			},


			isAuthenticated : function(){
				return authenticated;
			},

			login : function(username, password){
			var deferred = $q.defer();

			$http.post('/api/login', {
			username : username,
			password : password
			})
			.then(function(result){
			if(result.data.message === 'login failed'){
				deferred.resolve('login failed');
			}
			else if(result.data.message === 'user not activated'){
				deferred.resolve('user not activated');
			}
			else if(result.data.message === 'wrong password..retry'){
				deferred.resolve('wrong password..retry');
			}
			else{
			userInfo = {
			accessToken : result.data._id,
			userName : result.data.local.username
			};
			userData = {
			accessToken : result.data._id,
			userName : result.data.local.username
			};
			$window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
			deferred.resolve(userInfo);
			}
			},function(error){
			deferred.reject(error);
			});

			return deferred.promise;
			},

			logout : function(){
				var deferred = $q.defer();
				if(userInfo){
				$http.post('/api/logout', {
				headers : {
				"access_token" : userInfo.accessToken
				}
				})
				.then(function(result){
				if(result.data==='success'){	
				$window.sessionStorage["userInfo"] = null;
				userInfo = null;
				authenticated = false;
				}
				deferred.resolve(result);				
				},function(error){
				deferred.reject(error);
				});	
				}
				return deferred.promise;
			},

			getUserData : function(){
			return userData;
			}

			};

			return service;


	
}]);