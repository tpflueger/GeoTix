(function() {
  'use strict';

  var app = angular.module('geotix');

  app.controller('TicketDetailsController', ['$scope', '$timeout', 'MessageService', ticketDetailsController]);

  function ticketDetailsController($scope, $timeout, messageService) {

    $scope.$watch('userTickets', function (newValue, oldValue) {
      $scope.ticketId = parseInt($scope.$state.params.ticket_id, 10);
      if(_.find($scope.userTickets, { id: $scope.ticketId})) {
        $scope.ticket = _.find($scope.userTickets, {id: $scope.ticketId});
        $scope.isUserTicket = true;
      }
    });

    $scope.$watch('allTickets', function (newValue, oldValue) {
      $scope.ticketId = parseInt($scope.$state.params.ticket_id, 10);
      if(_.find($scope.allTickets, { id: $scope.ticketId})) {
        $scope.ticket = _.find($scope.allTickets, {id: $scope.ticketId});
        $scope.isUserTicket = false;
      }
    });

    $scope.sendMessage = function () {
      var conversation;
      if(_.find($scope.conversations, { sender_id: $scope.ticket.user_id})) {
        conversation = _.find($scope.conversations, { sender_id: $scope.ticket.user_id});
      } else {
        conversation = _.find($scope.conversations, { recipient_id: $scope.ticket.user_id});
      }

      if(conversation) {
        $scope.$state.go('home.message-details', { conversationId: conversation.id});
      } else {
        var newConversation = {
          sender_id: $scope.user.id,
          recipient_id: $scope.ticket.user_id,
          sender_name: $scope.user.username,
          recipient_name: $scope.ticket.username
        }

        messageService.createConversation(newConversation).then(function(convo) {
          $scope.$state.go('home.message-details', { conversationId: convo.conversation_id});
        }).catch(function (error) {

        });
      }
    }

    $scope.goto = function(ticket) {
      $('.ui.sidebar').sidebar('toggle');
      $scope.map.center.latitude = parseFloat(ticket.lat);
      $scope.map.center.longitude = parseFloat(ticket.long);
      $scope.map.zoom = 18;

      $timeout(function () {
        var map = document.getElementById('map_canvas');
        angular.element(map).triggerHandler('click');
      }, 0);
    };
  };
})();
