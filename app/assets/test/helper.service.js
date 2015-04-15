(function () {
	'use strict';

	var app = angular.module('geotix');

	app.factory('Helper', ['$httpBackend', helper]);

	function helper($httpBackend) {
		var user = {username: 'Test'};

		function originalState() {
			$httpBackend.whenPOST("/users/sign_in.json").respond(user);
			$httpBackend.expectPOST('/users/sign_in.json');
			$httpBackend.whenGET("home/_home.html").respond({});
			$httpBackend.expectGET('home/_home.html');
			$httpBackend.whenGET('panel/search/_panel.search.html').respond({});
			$httpBackend.expectGET('panel/search/_panel.search.html');
			$httpBackend.flush();
		}

		function getUser() {
			return user;
		}

		function setUser(value) {
			user = value;
		}
		return {
			originalState: originalState,
			setUser: setUser,
			getUser: getUser
		};
	}
})();