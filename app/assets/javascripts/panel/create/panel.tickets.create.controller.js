(function () {
  'use strict';

  var app = angular.module('geotix');

  app.controller('TicketCreateController', ['$scope', 'TicketService', ticketCreateController]);

  function ticketCreateController($scope, ticketService) {
    $scope.newTicket = {};

    $scope.submit = function() {
      ticketService.createUserTicket($scope.user.id, $scope.newTicket).then(function(data) {
        $scope.userTickets.push(data);
      }, function(error) {
        console.log(error);
      });
    };
  }
})();
