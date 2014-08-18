app.controller('profileController',['$http','$scope','$log',function($http,$scope,$log){

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

}]);