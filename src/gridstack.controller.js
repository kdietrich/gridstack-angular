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
        gridstack.make_widget(element);
        return element;
      }
      return null;
    };

  }]);
})();