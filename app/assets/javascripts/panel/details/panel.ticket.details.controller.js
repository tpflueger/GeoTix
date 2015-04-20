(function() {
  'use strict';

  var app = angular.module('geotix');

  app.controller('TicketDetailsController', ['$scope', ticketDetailsController]);

  function ticketDetailsController($scope) {
    $scope.grab = function() {
      var ticketId = $scope.$state.params.ticket_id;
      var ticket = {};

      console.log(ticketId);
    };
  };
})();
