app.controller('loginController',['$http','$scope','$log',function($http,$scope,$log){

		this.loginData = {};

		$scope.login = function(){
			$http({
		        method : 'POST',
		        url : '/login',
		        data : this.loginData,
		        headers : {'Content-Type': 'application/json'}
		         })
			.success(function(data){
				console.log("ok "+ data);
			})
			.error(function(data,status,headers,config){
				 throw new Error("Error: "+data);
			});
		};

}]);

