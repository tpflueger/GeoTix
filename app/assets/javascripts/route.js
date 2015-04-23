(function () {
    'use strict';

    var app = angular.module('geotix');

    app.config(['$stateProvider', '$urlRouterProvider', routes]);

    function routes ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                abstract: true,
                url: '/home',
                controller: 'HomeController',
                templateUrl: '_home.html'
            })
            .state('home.search', {
                url: '/search',
                views: {
                    'panel@': {
                        templateUrl: '_panel.search.html'
                    },
                    'panel': {
                        templateUrl: '_panel.search.html'
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
                        templateUrl: '_panel.user.tickets.html'
                    },
                    'panel': {
                        templateUrl: '_panel.user.tickets.html'
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
                        templateUrl: '_panel.tickets.create.html',
                        controller: 'TicketCreateController'
                    },
                    'panel': {
                        templateUrl: '_panel.tickets.create.html',
                        controller: 'TicketCreateController'
                    }
                }
            })
            .state('home.ticket', {
                url: '/tickets/:ticketId',
                views: {
                    'panel@home': {
                        templateUrl: '_login.html'
                    }
                }
            })
            .state('profile', {
                url: '/profile',
                templateUrl: '_profile.html',
                controller: 'ProfileController'
            });

        $urlRouterProvider.otherwise('home/search');
    }
})();
