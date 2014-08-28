app.config(function($stateProvider,$urlRouterProvider,$locationProvider){

	$urlRouterProvider.otherwise('/');

    $stateProvider

    	.state('index', {
            url: '/',
            templateUrl : '../views/index.html',
            controller  : 'loginController'       
   		})

       .state('activate', {
        	url : '/activate?uid&u&e',
        	templateUrl : '../views/activate.html',
        	controller : 'activationController'
        })
        

        .state('index.login',{
        	url : 'login',
            templateUrl : '../views/loginPartial.html',
            controller : 'loginController'
        })

        .state('index.forgotpass',{
            url : 'forgotpass',
            templateUrl : '../views/forgotpass.html',
            controller : 'passwordController'
        })

       .state('index.login.forgotpass', {
            url : '^/forgotpass'     
        })


        .state('index.signup',{
        	url : 'signup',
        	templateUrl : '../views/sign_up.html',
        	controller : 'signUpController'

        })
      

        // PROFILE PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('profile', {
 		    url: '/profile',
           views : {
           	'' : {
           		 templateUrl : '../views/profile.html',
				controller  : 'profileController'
           		},
           	'header@profile' : {
           		templateUrl : '../views/header.html'
           	},
           	'footer@profile' : {
           		templateUrl : '../views/footer.html'
           	},
           	'profile_right@profile' : {
           		templateUrl : '../views/profile_right.html'
           	},
           	'profile_left@profile' : {
           		templateUrl : '../views/profile_left.html'
           	},
           	 'status_template@profile' : {
           	templateUrl : '../views/status_template.html'
           }
           },
           resolve : {
           	getData : ['$q','$http','authenticationService', function($q,$http,authenticationService){           		
           			var deferred = $q.defer();
           			$http.post('/api/userdata').success(function(data){
           				console.log(data);
           				deferred.resolve(data);
           			}).error(function(error){
           				deferred.reject(error);
           			});	
           			return deferred.promise;
           	}]
           }
        });

		
        // USE html5 HISTORY API
        $locationProvider.html5Mode(true);
});
