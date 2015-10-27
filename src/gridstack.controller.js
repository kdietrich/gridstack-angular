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