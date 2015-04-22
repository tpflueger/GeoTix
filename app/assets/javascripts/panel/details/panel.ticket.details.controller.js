(function() {
  'use strict';

  var app = angular.module('geotix');

  app.controller('TicketDetailsController', ['$scope', '$timeout', ticketDetailsController]);

  function ticketDetailsController($scope, $timeout) {
    $scope.$watch('userTickets', function (newValue, oldValue) {
      $scope.ticketId = parseInt($scope.$state.params.ticket_id, 10);
      $scope.ticket = _.find($scope.userTickets, { id: $scope.ticketId });
    });

    $scope.goto = function(ticket) {
      $('.ui.sidebar').sidebar('toggle');
      $scope.map.center.latitude = parseFloat(ticket.lat);
      $scope.map.center.longitude = parseFloat(ticket.long);
      $scope.map.zoom = 18;

      $timeout(function () {
        var map = document.getElementById('map_canvas');
        angular.element(map).triggerHandler('click');
      }, 0);
    };
  };
})();
