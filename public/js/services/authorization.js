app.factory('authorization',['$rootScope','$window','authenticationService', function($rootScope,$window,authenticationService){
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