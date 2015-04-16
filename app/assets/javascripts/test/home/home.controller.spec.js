(function () {
	'use strict';

	describe('Home Controller', function () {
		var $rootScope,
			$scope,
			helper,
			ticketService,
			deferredUserTickets,
			deferredTickets,
			deferredCurrentPosition,
			deferredMapPosition,
			positionService,
			$q,
			$controller,
			position,
			updatedMap,
			map,
			userTickets,
			userPosition,
			updatedPosition,
			tickets;

		beforeEach(module('geotix'));

		beforeEach(module(function ($provide) {
			ticketService = {
				getUserTickets: function () { },
				getTickets: function () { }
			};
			$provide.value('TicketService', ticketService);

			positionService = {
				getCurrentPosition: function () { },
				getMapPosition: function () { }
			};
			$provide.value('PositionService', positionService);
		}));

		beforeEach(inject(function (Helper, _$rootScope_, _$controller_, _$q_) {
			$rootScope = _$rootScope_;
			$controller = _$controller_;
			$q = _$q_;
			helper = Helper;

			helper.originalState();

			$scope = $rootScope.$new();

			$scope.user = {
				id: 1
			};
			deferredUserTickets = $q.defer();
			spyOn(ticketService, 'getUserTickets').and.returnValue(deferredUserTickets.promise);

			deferredTickets = $q.defer();
			spyOn(ticketService, 'getTickets').and.returnValue(deferredTickets.promise);

			deferredCurrentPosition = $q.defer();
			spyOn(positionService, 'getCurrentPosition').and.returnValue(deferredCurrentPosition.promise);

			deferredMapPosition = $q.defer();
			spyOn(positionService, 'getMapPosition').and.returnValue(deferredMapPosition.promise);

			$controller('HomeController', {
				$scope: $scope
			});

			//deferredCurrentPosition.resolve(userPosition);

			userTickets = [{title: 'Test 1', id: 1}];
			tickets = [{title: 'Test 1', id: 1}, {title: 'Test 2', id: 2}];
			position = {coords: { latitude: 1, longitude: 1}};
			updatedMap = { center: { latitude: 1, longitude: 1}, zoom: 18};
			map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
			userPosition = {coords: {latitude: 25, longitude: 25}};
			updatedPosition = {coords: {latitude: 50, longitude: 50}};
		}));

		describe('On $scope', function () {
			it('Should set map', function () {
				expect($scope.map).toBeDefined();
			});
		});

		describe('On initialization', function () {
			beforeEach(function () {
				$rootScope.$digest();
			});

			describe('and calls getTickets', function () {
				describe('on success', function () {
					beforeEach(function () {
						deferredTickets.resolve(tickets);
						$rootScope.$digest();
					});

					it('Should set all tickets', function () {
						expect($scope.allTickets.length).toEqual(2);
					});
				});

				describe('on failure', function () {
					beforeEach(function () {
						deferredTickets.reject();
						$rootScope.$digest();
					});

					it('Should not set tickets', function () {
						expect($scope.allTickets).toBeUndefined();
					});
				});
			});

			describe('and calls getMapPosition', function () {
				describe('on success', function () {
					beforeEach(function () {
						deferredMapPosition.resolve(position);
						$rootScope.$digest();
					});

					it('Should update map', function () {
						expect($scope.map).toEqual(updatedMap);
					});
				});

				describe('on failure', function () {
					beforeEach(function () {
						deferredMapPosition.reject();
						$rootScope.$digest();
					});

					it('Shouldn\'t update map', function () {
						expect($scope.map).toEqual(map);
					});
				});
			});

			describe('On login', function () {
				describe('on success', function () {
					beforeEach(function () {
						$scope.allTickets = tickets;
						$rootScope.$broadcast('devise:login');
						deferredUserTickets.resolve(userTickets);
						$rootScope.$digest();
					});

					it('Should return userTickets', function () {
						expect($scope.userTickets.length).toEqual(1);
					});

					it('Should remove userTickets from allTickets', function () {
						expect($scope.allTickets[0].title).toEqual('Test 2');
					});
				});

				describe('on failure', function () {
					beforeEach(function () {
						$scope.allTickets = tickets;
						$rootScope.$broadcast('devise:login');
						deferredUserTickets.reject();
						$rootScope.$digest();
					});

					it('Should not return userTickets', function () {
						expect($scope.userTickets).toBeUndefined();
					});

					it('Should not remove userTickets from allTickets', function () {
						expect($scope.allTickets.length).toEqual(2);
					});
				});

				describe('On refresh position', function () {
					describe('and successful', function () {
						beforeEach(function () {
							deferredCurrentPosition.resolve(updatedPosition);
							$rootScope.$digest();
						});

						it('Should udpate userCircle', function () {
							expect($scope.userCircle).toEqual(updatedPosition)
						});

						it('Should create a promise', function () {
							expect($scope.promise).toBeDefined();
						});
					});

					describe('and not successful', function () {
						beforeEach(function () {
							deferredCurrentPosition.reject();
							$rootScope.$digest();
						});

						it('Should not update userCircle', function () {
							expect($scope.userCircle).toBeUndefined();
						});
					});
				});
			});
		});
	});
})();