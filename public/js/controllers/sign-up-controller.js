app.controller('signUpController',['$http','$scope','$log','$window','$timeout',function($http,$scope,$log,$window,$timeout){

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
	$scope.signupMsg = '';

	$scope.emailClass = '';
	$scope.usernameClass = '';
	$scope.passwordClass = '';


	$scope.signup = function(){
		if($scope.signupform.$valid){
		$http({
			method : 'post',
			url : '/signup',
			data : $scope.signUpFormData,
			headers : {'Content-type' : 'application/json'}
		})
		.success(function(data){
			if(data === 'activation success'){
				$scope.signupMsg = 'Registration successful, check email your for activation message';
				//empty form and show user signupMsg
			}
			else{
				$scope.signupMsg = 'Signup unsuccessful...you might want to try again later';
				$timeout(function(){
					$window.location.href = '/signup';
				},3000);
			}
				
			
		})
		.error(function(data,status,headers,config){
			console.log('Error: '+data);
		});
		$scope.signUpFormData = '';
		$scope.usermsg = '';
		$scope.emailmsg = '';
		}
	};


		$scope.$watch('signUpFormData.email', function(){
			if($scope.signUpFormData.email!='' && $scope.signUpFormData.email!= undefined){
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
				else if(data==='other'){
					$scope.emailmsg = $scope.signUpFormData.email+ ' available';
					$scope.emailClass = 'pass';
				}
				
			})
			.error(function(data){
				console.log('Error'+ data);
			});
			}

		});



		$scope.$watch('signUpFormData.username', function(){
			if($scope.signUpFormData.username!=''&& $scope.signUpFormData.username!= undefined){
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
				}else if(data==='other'){
					$scope.usermsg = $scope.signUpFormData.username+' available';
					$scope.usernameClass = 'pass';
				}

			})
			.error(function(data){
				console.log('Error occurred in signup..please try later');
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


