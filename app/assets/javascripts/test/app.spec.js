(function () {
	'use strict';

	describe('App', function () {
		var $rootScope,
			$q,
			$httpBackend,
			user,
			authenticated,
			logout,
			Auth,
			loginService,
			deferredUser,
			$state;

		beforeEach(module('geotix'));

		beforeEach(module(function ($provide) {
			Auth = {
				currentUser: function () {
					return user;
				},
				isAuthenticated: function () {
					return authenticated;
				},
				logout: function () {
					return logout;
				}
			};

			loginService = {
				openDialog: function () { }
			};
			$provide.value('LoginService', loginService);
		}));

		beforeEach(inject(function (_$rootScope_, _$state_, _$q_, _$httpBackend_) {
			$httpBackend = _$httpBackend_;
			$rootScope = _$rootScope_;
			$state = _$state_;
			$q = _$q_;

			deferredUser = $q.defer();
			spyOn(Auth, 'currentUser').and.returnValue(deferredUser.promise);
			spyOn(loginService, 'openDialog');

			authenticated = false;
			user = {username: 'Test'};

			$httpBackend.whenPOST("/users/sign_in.json").respond(user);
			$httpBackend.expectPOST('/users/sign_in.json');
			$httpBackend.whenGET("home/_home.html").respond({});
			$httpBackend.expectGET('home/_home.html');
			$httpBackend.whenGET('panel/search/_panel.search.html').respond({});
			$httpBackend.expectGET('panel/search/_panel.search.html');
			$httpBackend.flush();
		}));

		describe('On intialization', function () {
			it('Should set $state on $rootScope', function () {
				expect($rootScope.$state).toEqual($state);
			});

			it('Should set loginTry', function () {
				expect($rootScope.loginTry).toBeTruthy();
			});

			it('Should set registerTry', function () {
				expect($rootScope.registerTry).toBeFalsy();
			});

			it('Should set signedIn', function () {
				expect($rootScope.signedIn).toBeDefined();
			});

			it('Should set logout', function () {
				expect($rootScope.logout).toBeDefined();
			});

			it('Should set user if logged in', function () {
				deferredUser.resolve(user);
				$rootScope.$digest();
				expect($rootScope.user.username).toEqual('Test');
			});
		});

		describe('On registration', function () {
			beforeEach(function () {
				$rootScope.$broadcast('devise:new-registration', {username: 'Test'});
				$rootScope.$digest();
			});

			it('Should set the user', function () {
				expect($rootScope.user.username).toEqual('Test');
			});
		});

		describe('On unauthorization', function () {
			beforeEach(function () {
				$rootScope.$broadcast('devise:unauthorized');
				$rootScope.$digest();
			});

			it('Should call dialog', function () {
				expect(loginService.openDialog).toHaveBeenCalled();
			});
		});

		describe('On logout', function () {
			beforeEach(function () {
				$rootScope.$broadcast('devise:logout');
				$rootScope.$digest();
			});

			it('Should set user', function () {
				expect($rootScope.user).toEqual({});
			});
		});
	});
})();