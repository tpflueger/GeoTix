(function () {
	'use strict';

	var app = angular.module('geotix');

	app.factory('ContextService', ['$rootScope', contextService]);

	function contextService ($rootScope) {
		var contextList = [],
			context = {
				url: ''
			};

		function setContext (name) {
			if($rootScope.previousState === 'home.ticket-details' || name === 'ticketDetails') {
				context.url = 'home.tickets';
				contextList.push(context);
			} else if($rootScope.previousState === 'home.search') {
				context.url = 'home.search';
				contextList.push(context);
			}
		}

		function clearContext() {
			contextList = [];
		}

		function getContext () {
			return contextList;
		}

		return {
			setContext: setContext,
			getContext: getContext,
			clearContext: clearContext
		};
	}
})();