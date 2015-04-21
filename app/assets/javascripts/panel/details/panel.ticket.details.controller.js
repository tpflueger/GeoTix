(function() {
  'use strict';

  var app = angular.module('geotix');

  app.controller('TicketDetailsController', ['$scope', ticketDetailsController]);

  function ticketDetailsController($scope) {
    $scope.initialize = function() {
      $scope.ticketId = parseInt($scope.$state.params.ticket_id, 10);
      $scope.ticket = _.find($scope.userTickets, { id: $scope.ticketId });
      console.log("ticketId: " + $scope.ticketId);
      console.log($scope.ticket);
      console.log($scope.userTickets);
    };

    $scope.initialize();
  };
})();
