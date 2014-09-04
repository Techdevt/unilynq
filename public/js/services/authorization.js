app.factory('authorization',['$rootScope','$state','authenticationService', function($rootScope,$state,authenticationService){
	return {
		authorize : function(){
			 	authenticationService.init();
  				var authority =  authenticationService.isAuthenticated();
  				if(!authority){
  				$window.location.href = '/';
  				}	
	}
}
}]); 