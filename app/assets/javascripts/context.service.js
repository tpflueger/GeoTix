(function () {
	'use strict';

	var app = angular.module('geotix');

	app.factory('ContextService', ['$rootScope', contextService]);

	function contextService ($rootScope) {
		var contextList = [],
			context = {
				url: ''
			};

		function setContext () {
			if($rootScope.previousState === 'home.tickets' && $rootScope.currentState === 'home.ticket-details') {
				context.url = 'home.tickets';
				contextList.push(context);
			} else if($rootScope.previousState === 'home.search' && $rootScope.currentState === 'home.ticket-details') {
				context.url = 'home.search';
				contextList.push(context);
			} else if($rootScope.previousState === 'home.messages' && $rootScope.currentState === 'home.message-details') {
				context.url = 'home.messages';
				contextList.push(context);
			} else {
				clearContext();
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