app.directive("emptyElement", function(){
    return function(scope, element, attrs){
        element.bind("focus", function(){
        	this.value = '';
        });
    };
});