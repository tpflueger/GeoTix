(function () {
	'use strict';

	describe('Modal Controller', function () {
		var $rootScope,
			$scope,
			loginService,
			deferredLogin,
			deferredRegister,
			$q,
			$state,
			auth,
			helper,
			$controller;

		beforeEach(module('geotix'));

		beforeEach(module(function ($provide) {
			loginService = {
				closeDialog: function () { }
			};
			$provide.value('LoginService', loginService);
		}));

		beforeEach(inject(function (_$state_, Auth, Helper, _$rootScope_, _$controller_, _$q_) {
			$rootScope = _$rootScope_;
			$controller = _$controller_;
			$q = _$q_;
			helper = Helper;
			auth = Auth;
			$state = _$state_;

			$scope = $rootScope.$new();

			deferredLogin = $q.defer();
			spyOn(auth, 'login').and.returnValue(deferredLogin.promise);

			deferredRegister = $q.defer();
			spyOn(auth, 'register').and.returnValue(deferredRegister.promise);

			spyOn(loginService, 'closeDialog');
			spyOn($state, 'go');
			helper.originalState();

			$controller('ModalController', {
				$scope: $scope
			});
		}));

		describe('On intialization', function () {
			it('Should set person', function () {
				expect($scope.person).toBeDefined();
			});

			it('Should set registerUser', function () {
				expect($scope.registerUser).toBeDefined();
			});
		});

		describe('On login', function () {
			describe('and was successful', function () {
				beforeEach(function () {
					$scope.login();
					deferredLogin.resolve({});
					$rootScope.$digest();
				});

				it('Should close modal', function () {
					expect(loginService.closeDialog).toHaveBeenCalled();
				});

				it('Should change state', function () {
					expect($state.go).toHaveBeenCalled();
				});
			});

			describe('was unsuccessful', function () {
				beforeEach(function () {
					$scope.login();
					deferredLogin.reject();
					$rootScope.$digest();
				});

				it('Should not close modal', function () {
					expect(loginService.closeDialog).not.toHaveBeenCalled();
				});

				it('Should not change state', function () {
					expect($state.go).not.toHaveBeenCalled();
				});
			});
		});

		describe('On register', function () {
			describe('and was successful', function () {
				beforeEach(function () {
					$scope.register();
					deferredRegister.resolve({});
					$rootScope.$digest();
				});

				it('Should close modal', function () {
					expect(loginService.closeDialog).toHaveBeenCalled();
				});

				it('Should change state', function () {
					expect($state.go).toHaveBeenCalled();
				});
			});

			describe('was unsuccessful', function () {
				beforeEach(function () {
					$scope.register();
					deferredRegister.reject();
					$rootScope.$digest();
				});

				it('Should not close modal', function () {
					expect(loginService.closeDialog).not.toHaveBeenCalled();
				});

				it('Should not change state', function () {
					expect($state.go).not.toHaveBeenCalled();
				});
			});
		});
	});
})();
