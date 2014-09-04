'use strict';

var app = angular.module('unilynq',['ngAnimate','ui.router','angularFileUpload']);

app.value('activateMsg','');

app.value('userData', {});

/*app.filter('timeago', function(){
  return function(date){
    return moment(date).fromNow();
  };
});*/



  app.run(['$rootScope', '$state','$window','$stateParams', 'authorization', 'authenticationService',
    function($rootScope, $state,$window, $stateParams, authorization, authenticationService) {
      $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
	        $rootScope.toState = toState;
	        $rootScope.toStateParams = toStateParams;
   			if($rootScope.toState.name != 'index' && $rootScope.toState.name != 'index.login' && $rootScope.toState.name != 'index.signup' && $rootScope.toState.name != 'index.login.forgotpass' && $rootScope.toState.name != 'index.forgotpass' && $rootScope.toState.name != 'activate'){
   				authorization.authorize();
   			}
        });
       
      $rootScope.$on('$stateChangeSuccess',function(event, toState, toStateParams){
          //console.log($state.current.name);
      });

      $rootScope.$on('$stateChangeError', function(event){
      
      });
    }
  ]);