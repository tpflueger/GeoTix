(function () {
  'use strict';

  var app = angular.module('geotix');

  app.controller('HomeController', ['$rootScope', '$scope', '$timeout', 'TicketService', 'PositionService', 'MessageService', homeController]);

  function homeController($rootScope, $scope, $timeout, ticketService, positionService, messageService) {
    $rootScope.allMessages = {};
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

    $scope.openSidebar = function () {
      $('.ui.sidebar').sidebar('toggle');
    };

    $scope.$on('devise:login', function () {
      ticketService.getUserTickets($scope.user.id).then(function(userTickets) {
        $scope.userTickets = userTickets;
        _.remove($scope.allTickets, function(ticket) {
          return _.find($scope.userTickets, { id: ticket.id });
        });
      }, function(error) {
        console.log(error);
      });

      (function getMessagesAndConversations() {
        messageService.getConversations().then(function(convos) {
          $rootScope.conversations = convos;
        }).catch(function(error) {

        });

        var conversationIds = _($scope.conversations).pluck('id').value();

        _.forEach(conversationIds, function (value) {

          messageService.getMessages(value).then(function(messageList) {

          $rootScope.allMessages[value] = messageList;

          }).catch(function(error) {

          });

        });
        $scope.promiseMessages = $timeout(getMessagesAndConversations, 1000);
      })();
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

    $scope.getTicket = function(ticket, name) {
      $scope.openSidebar();
      if(name === 'allTickets') {
        $scope.$apply(function () {
          $scope.$state.go('home.search');
        });
      } else {
        $scope.$state.go('home.tickets');
      }
      $scope.$state.go('home.ticket-details', { ticket_id: ticket.id});
    };

    initialization();
  }
})();