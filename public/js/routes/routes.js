app.config(function($stateProvider,$urlRouterProvider,$locationProvider){

	$urlRouterProvider.otherwise('/');
    
    $stateProvider


    	.state('index', {
            url: '/',
            templateUrl : '../views/index.html',
            controller  : 'loginController',
            data : {pageTitle : 'Index'}
            
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
            url : '/forgotpass',
            views : 
            {
                '' : {
                        templateUrl : '../views/forgotpass.html',
                         controller : 'passwordController'

                }

            }
            
               
        })


        .state('index.signup',{
        	url : 'signup',
        	templateUrl : '../views/sign_up.html',
        	controller : 'signUpController'

        })
      

        // PROFILE PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('profile', {
            url: '/profile',
            templateUrl : '../views/profile.html',
			controller  : 'profileController',
			data : {pageTitle : 'Profile'}
        });

		
        // USE HTML5 HISTORY API
        $locationProvider.html5Mode(true);
});
