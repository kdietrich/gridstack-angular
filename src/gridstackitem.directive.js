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
        gridstackItem: '=',
        onItemAdded: '&'
      },
      link: function (scope, element, attrs, controller) {

        attrs.$observe('gridstackItem', function(val) {
          var widget = controller.addItem(element);
          var item = element.data('_gridstack_node');
          scope.onItemAdded({item: item});
        });

        element.bind('$destroy', function() {
          controller.removeItem(element);
        });

      }

    };

  });
})();