(function() {
'use strict';

var app = angular.module('gridstack-angular');

app.directive('gridstack', ['$timeout', function($timeout) {

  return {
    restrict: 'A',
    controller: 'GridstackController',
    scope: {
      onChange: '&',
      onDragStart: '&',
      onDragStop: '&',
      onResizeStart: '&',
      onResizeStop: '&',
      gridstackHandler: '=?',
      options: '='
    },
    link: function(scope, element, attrs, controller, ngModel) {

      var gridstack = controller.init(element, scope.options);
      scope.gridstackHandler = gridstack;

      element.on('change', function(e, items) {
        $timeout(function() {
          scope.$apply();
          scope.onChange({event: e, items: items});
        });
      });

      element.on('dragstart', function(e, ui) {
        scope.onDragStart({event: e, ui: ui});
      });

      element.on('dragstop', function(e, ui) {
        $timeout(function() {
          scope.$apply();
          scope.onDragStop({event: e, ui: ui});
        });
      });

      element.on('resizestart', function(e, ui) {
        scope.onResizeStart({event: e, ui: ui});
      });

      element.on('resizestop', function(e, ui) {
        $timeout(function() {
          scope.$apply();
          scope.onResizeStop({event: e, ui: ui});
        });
      });

    }
  };

}]);
})();
