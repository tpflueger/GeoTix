(function () {
  'use strict';

  var app = angular.module('geotix');

  app.controller('HomeController', ['$scope', '$timeout', 'TicketService', 'PositionService', homeController]);

  function homeController($scope, $timeout, ticketService, positionService) {

    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

    $scope.openSidebar = function () {
      $('.ui.sidebar').sidebar('toggle');
    };

    $scope.$on('devise:login', function () {
      ticketService.getUserTickets($scope.user.id).then(function(userTickets) {
        $scope.userTickets = userTickets;
      }, function(error) {
        console.log(error);
      });
    });

    (function refreshPosition() {
        positionService.getCurrentPosition().then(function(userPos) {
          $scope.userCircle = userPos;
        });
        $scope.promise = $timeout(refreshPosition, 1000);
    })();

    function initialization() {
      ticketService.getTickets().then(function(tickets) {
        $scope.allTickets = tickets;
      }, function(error) {
        console.log(error);
      });

      positionService.getMapPosition().then(function(position) {
        $scope.map.center.latitude = position.coords.latitude;
        $scope.map.center.longitude = position.coords.longitude;
        $scope.map.zoom = 18;

        $timeout(function () {
          var map = document.getElementById('map_canvas');
          angular.element(map).triggerHandler('click');
        }, 0);
      });
    }

    initialization();
  }
})();