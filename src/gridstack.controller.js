(function() {
'use strict';

angular.module('gridstack-angular', []);

var app = angular.module('gridstack-angular');

app.controller('GridstackController', ['$scope', function($scope) {

  this.gridstack = null;

  this.init = function(element, options) {
    this.gridstack = element.gridstack(options).data('gridstack');
    return this.gridstack;
  };

  this.removeItem = function(element) {
    if(this.gridstack) {
      return this.gridstack.removeWidget(element, false);
    }
    return null;
  };

  this.addItem = function(element) {
    if(this.gridstack) {
      this.gridstack.makeWidget(element);
      return element;
    }
    return null;
  };

}]);
})();