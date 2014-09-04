app.directive('timeago', function() {
  return {
    restrict:'A',
    link: function(scope, element, attrs){
      attrs.$observe("timeago", function(){
        element.text(moment(attrs.timeago).fromNow());
      });
    }
  };
});

app.directive('date', function(){
	return {
		restrict : 'A',
		link : function(scope,element,attrs){
				element.text(moment(attrs.date).format('LLL'));
		}
	}
});