app.controller('loginController',['$http','$scope','$log','$window','authenticationService', function($http,$scope,$log,$window,authenticationService){

		$scope.loginData = {};
		$scope.submitted = false;
		$scope.showMessage = false;
		$scope.loginMsg = '';

		$scope.submit = function(){
			$scope.showMessage = true;
			authenticationService.login($scope.loginData.username, $scope.loginData.password).then(function(result){
				if(result==='login failed'){return $scope.loginMsg="Login failure..Account not registered"}
				else if( result === 'user not activated') { return $scope.loginMsg = 'Account not activated. Check your email for activation message'}
				else if( result === 'wrong password..retry') { return $scope.loginMsg = 'password incorrect'}
				else{
				userData = authenticationService.getUserData();
				//console.log(userData);
				$window.location.href = '/profile?u='+userData.userName;
				}
			});
			$scope.loginData = {};
		};

}]);

