(function () {
  'use strict';

  var app = angular.module('geotix');

  app.controller('TicketCreateController', ['$scope', 'TicketService', 'ContextService', ticketCreateController]);

  function ticketCreateController($scope, ticketService) {
    $scope.newTicket = {};

    $scope.submit = function() {
      var ticket = {
        lat: $scope.userCircle.center.latitude,
        long: $scope.userCircle.center.longitude,
        title: $scope.newTicket.title,
        description: $scope.newTicket.description,
        username: $scope.user.username
      };

      ticketService.createUserTicket($scope.user.id, ticket).then(function(data) {
        $scope.userTickets.push(data);
        $scope.$state.go('home.ticket-details', { ticket_id: data.id });
      }, function(error) {
        console.log(error);
      });

      $scope.newTicket.title = "";
      $scope.newTicket.description = "";
    };
  }
})();
