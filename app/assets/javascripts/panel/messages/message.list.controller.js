(function () {
	'use strict';

	var app = angular.module('geotix');

	app.controller('MessageListController', ['$scope', 'MessageService', messageListController]);

	function messageListController($scope, messageService) {

		messageService.getConversations().then(function (convos) {
			$scope.conversations = convos;
		}, function(error) {
			console.log(error);
		});

		$scope.getOtherUser = function (conversation) {
			if(conversation.sender_name === $scope.user.username) {
				return conversation.recipient_name;
			} else {
				return conversation.sender_name;
			}
		};

		$scope.mostRecentMessage = function (conversation) {
			$scope.messages = _.where($scope.allMessages, { conversation_id: conversation.id});

			if($scope.messages && $scope.messages.length > 0) {
				var date;
				_.forEach($scope.messages, function(message) {
					if(date < message.updated_at) {
						date = message.updated_at;
					}
				});
				return date;
			} else {
				return conversation.updated_at;
			}
		};

		$scope.hasNoMessages = function (conversation) {

		};
	}
})();