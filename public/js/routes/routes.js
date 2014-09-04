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
 		    url: '/profile?u',
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
           	getData : ['$q','$stateParams','$http','authenticationService', function($q,$stateParams,$http,authenticationService){           		
           			var user = {username : $stateParams.u };
                var deferred = $q.defer();

           	    $http({
                  method : 'post',
                  url : '/api/userdata',
                  data : user,
                  headers : {'Content-type' : 'application/json'}
                })
                .then(function(data){

                  deferred.resolve(data)
                }, function(error){
                  if(error)
                    console.log(error);
                });
                return deferred.promise;
           	}],

            statusFetch : ['statusService','$q','$stateParams', function(statusService,$q,$stateParams){
              var deferred = $q.defer();
              var user = $stateParams.u;
              statusService.fetch(user).then(function(data){
                deferred.resolve(data);
              })
              return deferred.promise;
           }]
           },
           delay: function($q, $defer) {
            var delay = $q.defer();
            $defer(delay.resolve, 1000);
            return delay.promise;
           }
        });

		
        // USE html5 HISTORY API
        $locationProvider.html5Mode(true);
});
