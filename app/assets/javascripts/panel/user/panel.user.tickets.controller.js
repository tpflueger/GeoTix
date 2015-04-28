(function() {
  'use strict';

  var app = angular.module('geotix');

  app.controller('UserTicketsController', ['$scope', 'TicketService', userTicketsController]);

  function userTicketsController($scope, ticketService) {
    $scope.delete = function(ticketId) {
      ticketService.deleteUserTicket($scope.user.id, ticketId);
      _.remove($scope.userTickets, { id: ticketId });
    };
  };
})();
