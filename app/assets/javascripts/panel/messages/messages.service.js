(function () {
	'use strict';

	var app = angular.module('geotix');

	app.service('MessageService', ['$http', '$q', messageService]);

	function messageService($http, $q) {

		function createConversation (converesation) {
			var url = ['conversations'].join('/'),
				deferred = $q.defer();

			$http.post(url, converesation).success(function(data) {
				deferred.resolve(data);
			}, function(error) {
				deferred.reject(error);
			});

			return deferred.promise;
		}

		function getConversations() {
			var url = ['conversations'].join('/'),
				deferred = $q.defer();

			$http.get(url).success(function(data) {
				deferred.resolve(data);
			}, function(error) {
				deferred.reject(error);
			});

			return deferred.promise;
		}

		function getMessages(convoId) {
			var url = ['conversations', convoId, 'messages'].join('/'),
				deferred = $q.defer();

			$http.get(url).success(function(data) {
				deferred.resolve(data);
			}, function(error) {
				deferred.reject(error);
			});

			return deferred.promise;
		}

		function sendMessage(convoId, message) {
			var url = ['conversations', convoId, 'messages'].join('/'),
				deferred = $q.defer();

			$http.post(url, message).success(function(data) {
				deferred.resolve(data);
			}, function(error) {
				deferred.reject(error);
			});

			return deferred.promise;
		}

		function updateMessage(convoId, messageId, message) {
			var url = ['conversations', convoId, 'messages', messageId].join('/'),
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
			getMessages: getMessages,
			sendMessage: sendMessage,
			updateMessage: updateMessage
		}
	}
})();