/**
 * gridstack-angular - Angular Gridstack.js directive
 * @version v0.2.0
 * @author Kevin Dietrich
 * @link https://github.com/kdietrich/gridstack-angular#readme
 * @license MIT
 */
(function() {
  'use strict';

  angular.module('gridstack-angular', []);

  var app = angular.module('gridstack-angular');

  /** @ngInject */
  app.controller('GridstackController', ['$scope', function($scope) {

    var gridstack = null;

    this.init = function(element, options) {
      gridstack = element.gridstack(options).data('gridstack');
      return gridstack;
    };

    this.removeItem = function(element) {
      if(gridstack) {
        return gridstack.remove_widget(element, false);
      }
      return null;
    };

    this.addItem = function(element) {
      if(gridstack) {
        //Workaround until make_widget PR is merged in gridstack.js
        gridstack._prepare_element(element);
        gridstack._update_container_height();
        return element;
      }
      return null;
    };

  }]);
})();
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
        onDragStart: '&',
        onDragStop: '&',
        onResizeStart: '&',
        onResizeStop: '&',
        options: '='
      },
      link: function (scope, element, attrs, controller, ngModel) {

        controller.init(element, scope.options);

        element.on('change', function (e, items) {
          scope.onChange({event: e, items: items});
        });

        element.on('dragstart', function(e, ui) {
          scope.onDragStart({event: e, ui: ui});
        });

        element.on('dragstop', function(e, ui) {
          scope.onDragStop({event: e, ui: ui});
        });

        element.on('resizestart', function(e, ui) {
          scope.onResizeStart({event: e, ui: ui});
        });

        element.on('resizestop', function(e, ui) {
          scope.onResizeStop({event: e, ui: ui});
        });

      }
    };

  });
})();
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