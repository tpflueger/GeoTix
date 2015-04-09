(function () {
  'use strict';

  var app = angular.module('geotix');

  app.controller('TicketCreateController', ['$scope', 'TicketService', ticketCreateController]);

  function ticketCreateController($scope, ticketService) {
    $scope.newTicket = {};

    $scope.submit = function() {
      var ticket = {
        lat: $scope.userCircle.center.latitude,
        long: $scope.userCircle.center.longitude,
        title: $scope.newTicket.title,
        description: $scope.newTicket.description
      };

      ticketService.createUserTicket($scope.user.id, ticket).then(function(data) {
        $scope.userTickets.push(data);
      }, function(error) {
        console.log(error);
      });
    };
  }
})();
