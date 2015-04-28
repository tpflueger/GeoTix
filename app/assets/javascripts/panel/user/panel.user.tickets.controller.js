(function() {
  'use strict';

  var app = angular.module('geotix');

  app.controller('UserTicketsController', ['$scope', 'TicketService', userTicketsController]);

  function userTicketsController($scope, ticketService) {
    $scope.delete = function(ticket) {
      ticketService.deleteUserTicket($scope.user.id, ticket.id);
      _.remove($scope.userTickets, { id: ticket.id });
    };
  };
})();
