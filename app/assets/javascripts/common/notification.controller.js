(function () {
	'use strict';

	var app = angular.module('geotix');

	app.controller('NotificationController', ['$scope', 'NotificationService', notificationController]);

	function notificationController($scope, notificationService) {
		$scope.readNotification = function(item) {
			if(item.view) {
				return;
			}
			var notification = {
				view: true,
				user: item.user,
				user_id: parseInt(item.user_id, 10),
				ticket_name: item.ticket_name,
				ticket_id: parseInt(item.ticket_id, 10),
				id: item.id
			},
			index = _.findIndex($scope.notifications, {id: item.id});
			notificationService.updateNotification($scope.$root.user.id, notification.id, notification).then(function(notification) {
				$scope.notifications[index] = notification[0];
			}, function (error) {

			});
		}

		$scope.$watch('notifications', function(newVal, oldVal) {
			$scope.displayNotifications();
		}, true);

		$scope.displayNotifications = function () {
			var num = unreadNotifications();

			if(num > 9) {
				return '10+';
			} else if(num === 0) {
				return '';
			}

			return num;
		};

		function unreadNotifications() {
			var unread = 0;
			_.forEach($scope.notifications, function(item) {
				if(!item.view) {
					unread++;
				}
			});
			return unread;
		}
	}
})();