app.factory('statusService', ['$q','$http', function($q,$http){
	return {
	fetch : function(user){
			var deferred = $q.defer();
			$http({
				method : 'post',
				url : '/api/status',
				data : { user : user},
				headers : {'Content-Type':'application/json'}
			})
			.then(function(data){
				deferred.resolve(data);
			}, function(error){
				deferred.reject(error);
			});


		return deferred.promise;
	}
	}
}])