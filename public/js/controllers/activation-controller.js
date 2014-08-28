app.controller('activationController', function($http,$scope,$stateParams,$timeout,$window){
        $scope.activateMsg = '';
        $scope.userid = $stateParams.uid;
        $scope.username = $stateParams.u;
        $scope.email = $stateParams.e;
        $scope.url = '/activate/'+$scope.userid+'/'+$scope.username+'/'+$scope.email;
        $scope.msgClass = '';

        $timeout(function(){
        	$http.post($scope.url)
        	.success(function(data){
                        $scope.msgClass = "error";
        		$scope.activateMsg = data;
        		if(data === 'Sorry user does not exist in our system...try again later'){
        			$timeout(function(){
        			$window.location.href = '/signup';
        			},5000);
        			}

        		if(data === 'successfully activated..you will be redirected to login page in a second'){
        			$timeout(function(){
        			$window.location.href = '/';
        			},5000);
        			}

        	})
        	.error(function(data){
        		$scope.activateMsg = 'Sorry.. Problem occurred in activation..';
        	});
        },1000);
});