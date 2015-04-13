(function () {
	'use strict';

	var app = angular.module('geotix');

	app.directive('notificationDropdown', function () {
		return {
			restrict: 'E',
			scope: {
				notifications: '='
			},
			templateUrl: 'common/notification.dropdown.html',
			controller: 'NotificationController',
			link: function (scope, element, attrs) {
				$(element).dropdown({ action: 'nothing'});
			}
		};
	});
})();