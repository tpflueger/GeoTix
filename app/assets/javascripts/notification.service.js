(function() {
	'use strict';

	var app = angular.module('geotix');

	app.factory('NotificationService', ['$http', '$q', notificationService]);

	function notificationService ($http, $q) {

		function getNotifications(userId) {
			var url = ['users', userId, 'notifications.json'].join('/'),
				deferred = $q.defer();

			$http.get(url).success(function(data) {
				deferred.resolve(data);
			}, function(error) {
				deferred.reject(error);
			});

			return deferred.promise;
		}

		function updateNotification(userId, notificationId, notification) {
			var url = ['users', userId, 'notifications', notificationId + '.json'].join('/'),
				deferred = $q.defer();

			$http.put(url, notification).success(function(data) {
				deferred.resolve(data);
			}, function(error) {
				deferred.reject(error);
			});

			return deferred.promise;
		}

		function deleteNotification(userId, notificationId) {
			var url = ['users', userId, 'notifications', notificationId + '.json'].join('/'),
				deferred = $q.defer();

			$http.delete(url).success(function(data) {
				deferred.resolve(data);
			}, function(error) {
				deferred.reject(error);
			});

			return deferred.promise;
		}

		function createNotification(userId, notification) {
			var url = ['users', userId, 'notifications.json'].join('/'),
				deferred = $q.defer();

			$http.post(url, notification).success(function(data) {
				deferred.resolve(data);
			}, function(error) {
				deferred.reject(error);
			});

			return deferred.promise;
		}

		return {
			getNotifications: getNotifications,
			updateNotification: updateNotification,
			deleteNotification: deleteNotification,
			createNotification: createNotification
		};
	}
})();