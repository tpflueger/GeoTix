(function() {
  'use strict';

  var app = angular.module('geotix');

  app.controller('UserTicketsController', ['$scope', 'TicketService', userTicketsController]);

  function userTicketsController($scope, ticketService) {
    $scope.delete = function(ticket) {
      console.log("before: " + $scope.userTickets.length);
      ticketService.deleteUserTicket($scope.user.id, ticket.id);
      $scope.userTickets = _.without($scope.userTickets, [ticket]);
      console.log("after: " + $scope.userTickets.length);
    };
  };
})();
