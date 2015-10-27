(function() {
  'use strict';

  var app = angular.module('gridstack-angular');

  /** @ngInject */
  app.directive('gridstack', function() {

    return {
      restrict: "A",
      controller: 'GridstackController',
      scope: {
        onChange: '&',
        dragStart: '&',
        dragStop: '&',
        resizeStart: '&',
        resizeStop: '&',
        options: '='
      },
      link: function (scope, element, attrs, controller, ngModel) {

        controller.init(element, scope.options);

        element.on('change', function (event, items) {
          scope.onChange(event, items);
        });

        element.on('dragstart', function(event, ui) {
          scope.dragStart(event, ui);
        });

        element.on('dragstop', function(event, ui) {
          scope.dragStop(event, ui);
        });

        element.on('resizestart', function(event, ui) {
          scope.resizeStart(event, ui);
        });

        element.on('resizestop', function(event, ui) {
          scope.resizeStop(event, ui);
        });

      }
    };

  });
})();