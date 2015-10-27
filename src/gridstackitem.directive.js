(function() {
  'use strict';

  var app = angular.module('gridstack-angular');

  /** @ngInject */
  app.directive('gridstackItem', function() {

    return {
      restrict: "A",
      controller: 'GridstackController',
      require: '^gridstack',
      scope: {
        'gridstackItem': '='
      },
      link: function (scope, element, attrs, controller) {

        attrs.$observe('gridstackItem', function(val) {
          var widget = controller.addItem(element);
        });

        element.bind('$destroy', function() {
          controller.removeItem(element);
        });

      }

    };

  });
})();