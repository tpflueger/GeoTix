(function () {
	'use strict';

	var app = angular.module('geotix');

	app.controller('MessageDetailsController', ['$scope', '$timeout', 'MessageService', messageDetailsController]);

	function messageDetailsController($scope, $timeout, messageService) {
		var updatedScroll = false;
		$scope.conversationId = parseInt($scope.$state.params.conversationId, 10);

		$scope.$watch('conversations', function(newVal, oldVal) {
			if($('.ui.sidebar').hasClass('uncover') && !updatedScroll) {
				$timeout(function () {
					var messageThread = document.getElementsByClassName('message')[0];
					messageThread.scrollTop = messageThread.scrollHeight;
				});
				updatedScroll = true;
			}

			var newMessages = _.filter($scope.allMessages[$scope.conversationId], {conversation_id: $scope.conversationId});
			var oldMessages = _.filter($scope.messages, {conversation_id : $scope.conversationId});

			if(newVal && (!$scope.conversation || !$scope.messages || newMessages.length !== oldMessages.length)) {
				if(_.find(newVal, {id: $scope.conversationId})) {
					$scope.conversation = _.find(newVal, {id: $scope.conversationId});
					$scope.senderName = $scope.conversation.sender_name;
					$scope.recipientName = $scope.conversation.recipient_name;
					$scope.messages = $scope.allMessages[$scope.conversationId];
				}
			}
		});

		$scope.$watch('messages', function (newVal, oldVal) {
			if (newVal && oldVal && newVal.length !== oldVal.length) {
				$scope.messages = $scope.allMessages[$scope.conversationId];
				$timeout(function () {
					var messageThread = document.getElementsByClassName('message')[0];
					messageThread.scrollTop = messageThread.scrollHeight;
				});
			}
		});

		$scope.isMessageFromUser = function(message) {
			if(message.user_id === $scope.user.id) {
				return true;
			} else {
				return false;
			}
		};

		$scope.getOtherUser = function () {
			if(!$scope.conversation) {
				return;
			}

			if($scope.user.id === $scope.conversation.sender_id) {
				return $scope.conversation.recipient_name;
			} else {
				return $scope.conversation.sender_name;
			}
		};

		$scope.hasReadMessage = function (message) {
			if(message.user_id === $scope.user.id) {
				return;
			}

			var updateMessage = {
				id: message.id,
				body: message.body,
				conversation_id: message.conversation_id,
				user_id: message.user_id,
				viewed: true
			}

			messageService.updateMessage($scope.conversationId, message.id, updateMessage).then(function(message) {
				console.log(message)
			}).catch(function(error) {

			});
		};

		$scope.sendMessage = function () {
			var message = {
				body: $scope.message.body,
				conversation_id: $scope.conversationId,
				user_id: $scope.user.id,
				viewed: false
			};

			messageService.sendMessage($scope.conversationId, message).then(function(newMessage) {
				$scope.messages.push(newMessage);
				$scope.allMessages[$scope.conversationId].push(newMessage);
				$timeout(function () {
					var messageThread = document.getElementsByClassName('message')[0];
					messageThread.scrollTop = messageThread.scrollHeight;
				});
			}).catch(function(error) {

			});

			$scope.message.body = null;
		};
	}
})();