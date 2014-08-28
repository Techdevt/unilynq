app.directive("shakeThat", ['$animate', function($animate){

	return{
		require : '^form',
		scope : {
			submit : '&',
			submitted : '='
		},
		link : function(scope, element, attrs, form){
			element.on('submit' , function(){
				scope.$apply(function(){
					if(form.$valid) return scope.submit();
					scope.submitted = true;

					//shaking the form
					$animate.addClass(element, 'shake', function(){
						$animate.removeClass(element, 'shake');
					});

				});
			});
		}
	}

}]);