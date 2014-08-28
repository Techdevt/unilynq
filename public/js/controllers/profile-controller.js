app.controller('profileController',['$http','$scope','$log','$window','$state','authenticationService',function($http,$scope,$log,$window,$state,authenticationService,getData){
	$scope.user = "This is what i initially contain";

	$scope.cars = [{ brand : "Astra", 
	 make : "opel" 
   },
   {brand : "Toyota", 
	make : "Land Cruiser"
   },
   {brand : "Ford", 
   make : "Estella"
   },
   {brand : "Nissan", 
   make : "Ascatra"
   }
   ];
   $scope.logout = function(){
   	authenticationService.logout().then(function(data){
				if(data){
					$window.location.href = '/';
				}
			});

   };





   $scope.fetchUser = function(){
   	authenticationService.getUserData().then(function(result){
   		$scope.user = result;
   	});
   };


}]);