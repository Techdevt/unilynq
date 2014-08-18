
app.directive('updateTitle', function($rootScope) {
  return {
    link: function(scope, element) {

      var listener = function(event, toState, toParams, fromState, fromParams) {
        var title = 'Unilynq';
        if (toState.data && toState.data.pageTitle) title = toState.data.pageTitle;
        element.text('Unilynq - '+title)
      };

      $rootScope.$on('$stateChangeStart', listener);
    }
  }
});

