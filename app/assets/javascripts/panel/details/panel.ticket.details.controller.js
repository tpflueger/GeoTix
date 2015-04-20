(function() {
  'use strict';

  var app = angular.module('geotix');

  app.controller('TicketDetailsController', ['$scope', ticketDetailsController]);

  function ticketDetailsController($scope) {
    $scope.initialize = function() {
      $scope.ticketId = parseInt($scope.$state.params.ticket_id, 10);
      $scope.ticket = _.find($scope.userTickets, { id: $scope.ticketId });
    };

    $scope.initialize();
  };
})();
