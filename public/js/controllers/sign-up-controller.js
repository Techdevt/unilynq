app.controller('signUpController',['$http','$scope','$log',function($http,$scope,$log){

	$scope.signUpFormData = {
		fname: '',
		lname: '',
		username: '',
		email: '',
		password: '',
		password2 : ''
		};

	$scope.pswdmsg = '';
	$scope.emailmsg = '';
	$scope.usermsg = '';

	$scope.emailClass = '';
	$scope.usernameClass = '';
	$scope.passwordClass = '';


	$scope.signup = function(){
		$http({
			method : 'post',
			url : '/signup',
			data : $scope.signUpFormData,
			headers : {'Content-type' : 'application/json'}
		})
		.success(function(data){

		})
		.error(function(data,status,headers,config){
			console.log('Error: '+data);
		});
		$scope.signUpFormData = '';
	};


		$scope.$watch('signUpFormData.email', function(){
			if($scope.signUpFormData.email!=''){
			$http({
				method : 'post',
				url : '/validate/email',
				data : $scope.signUpFormData,
				headers : {'Content-type' : 'application/json'}
			})
			.success(function(data){
				if(data!='' && data==='email exists'){
					$scope.emailmsg = $scope.signUpFormData.email + ' already used to register';
					$scope.emailClass = 'error';
				}
				else if(data==='permit'){
				$scope.emailmsg = $scope.signUpFormData.email + ' is fine';
				$scope.emailClass = 'pass';
				}
				else{
					$scope.emailmsg = 'sorry..server verification failed at the moment';
					$scope.emailClass = 'error';
				}
				
			})
			.error(function(data){
				console.log('Error'+ data);
			});
			}

		});



		$scope.$watch('signUpFormData.username', function(){
			if($scope.signUpFormData.username!=''){
			$http({
				method : 'post',
				url : '/validate/username',
				data : $scope.signUpFormData,
				headers : {'Content-type' : 'application/json'}
			})
			.success(function(data){
				if(data!='' && data==='username exists'){
					$scope.usermsg = $scope.signUpFormData.username+' already registered..try another';
					$scope.usernameClass = 'error';
				}else if(data==='permit'){
				$scope.usermsg = $scope.signUpFormData.username+' is available';
				$scope.usernameClass = 'pass';
				}
				else{
					$scope.usermsg = 'sorry..server verification failed at the moment';
					$scope.usernameClass = 'error';
				}
			})
			.error(function(data){
				console.log('Error'+ data);
			});
			}
		});



		$scope.$watch('signUpFormData.password', function(n,o){
			//console.log('Value changed to :'+ $scope.signUpFormData.email);

			//calculate password strength here

		}),true;

		
		$scope.$watch('signUpFormData.password2', function(){
			if($scope.signUpFormData.password!=$scope.signUpFormData.password2){
				$scope.passwordClass = 'error';
				$scope.pswdmsg = 'Your passwords do not match';
			}else{
				$scope.pswdmsg = '';
			}
		}),true;



	

}]);


