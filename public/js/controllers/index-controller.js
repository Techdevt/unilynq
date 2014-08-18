app.controller('indexController',['$http','$scope','$log',function($http,$scope,$log){

$scope.books = [{ name : "King Solomon's mines", 
					 price : 3.5 
				   },
				   {name : "Peter Pan", 
					price : 94
				   },
				   {name : "Wesley Snipes", 
				   price : 70
				   },
				   {name : "Defiance", 
				   price : 2.95
				   }
				   ];

}]);
