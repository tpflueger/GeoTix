(function () {
    'use strict';

    var app = angular.module('geotix');

    app.config(['$stateProvider', '$urlRouterProvider', routes]);

    function routes ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                abstract: true,
                url: '/home',
                controller: 'MainCtrl',
                views: {
                    '': {
                        templateUrl: 'home/_main.html'
                    }
                }
            })
            .state('home.search', {
                url: '/search',
                views: {
                    'panel@': {
                        templateUrl: 'panel/search/_panel.search.html'
                    },
                    'panel': {
                        templateUrl: 'panel/search/_panel.search.html'
                    }
                },
                data: {
                    active: 'search'
                }
            })
            .state('home.tickets', {
                url: '/tickets',
                controller: 'ProfileController',
                views: {
                    'panel@': {
                        templateUrl: 'panel/user/_panel.user.tickets.html'
                    },
                    'panel': {
                        templateUrl: 'panel/user/_panel.user.tickets.html'
                    }
                },
                data: {
                    active: 'tickets'
                }
            })
            .state('home.tickets-create', {
                url: '/tickets/create',
                views: {
                    'panel@': {
                        templateUrl: 'panel/create/_panel.tickets.create.html',
                        controller: 'TicketCreateController'
                    },
                    'panel': {
                        templateUrl: 'panel/create/_panel.tickets.create.html',
                        controller: 'TicketCreateController'
                    }
                }
            })
            .state('home.ticket', {
                url: '/tickets/:ticketId',
                views: {
                    'panel@home': {
                        templateUrl: 'auth/_login.html'
                    }
                }
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'profile/_profile.html',
                controller: 'ProfileController'
            });

        $urlRouterProvider.otherwise('home/search');
    }
})();
