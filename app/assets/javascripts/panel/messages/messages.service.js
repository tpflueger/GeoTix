(function () {
	'use strict';

	var app = angular.module('geotix');

	app.service('MessageService', ['$http', '$q', messageService]);

	function messageService($http, $q) {

		function createConversation (senderId, recipientId) {
			var url = ['conversations.json'].join('/'),
				deferred = $q.defer();

			$http.post(url, {sender_id: senderId, recipient_id: recipientId}).success(function(data) {
				deferred.resolve(data);
			}, function(error) {
				deferred.reject(error);
			});

			return deferred.promise;
		}

		function getConversations() {
			var url = ['conversations.json'].join('/'),
				deferred = $q.defer();

			$http.get(url).success(function(data) {
				deferred.resolve(data);
			}, function(error) {
				deferred.reject(error);
			});

			return deferred.promise;
		}

		function getMesssages(convoId) {
			var url = ['conversations', convoId, 'messages.json'].join('/'),
				deferred = $q.defer();

			$http.get(url).success(function(data) {
				deferred.resolve(data);
			}, function(error) {
				deferred.reject(error);
			});

			return deferred.promise;
		}

		function sendMessage(convoId, message) {
			var url = ['conversations', convoId, 'messages.json'].join('/'),
				deferred = $q.defer();

			$http.post(url, message).success(function(data) {
				deferred.resolve(data);
			}, function(error) {
				deferred.reject(error);
			});

			return deferred.promise;
		}

		function updateMessage(convoId, messageId, message) {
			var url = ['conversations', convoId, 'messages', messageId + '.json'].join('/'),
				deferred = $q.defer();

			$http.put(url, message).success(function(data) {
				deferred.resolve(data);
			}, function(error) {
				deferred.reject(error);
			});

			return deferred.promise;
		}

		return {
			createConversation: createConversation,
			getConversations: getConversations,
			getMesssages: getMesssages,
			sendMessage: sendMessage,
			updateMessage: updateMessage
		}
	}
})();