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
                templateUrl: 'home/_home.html'
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
                },
                resolve: {
                    setContext: function(ContextService) {
                        return ContextService.clearContext();
                    }
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
                },
                resolve: {
                    setContext: function(ContextService) {
                        return ContextService.clearContext();
                    }
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
                },
                resolve: {
                    setContext: function(ContextService) {
                        return ContextService.clearContext();
                    }
                }
            })
            .state('home.ticket-details', {
                url: '/tickets/:ticket_id',
                views: {
                    'panel@': {
                        templateUrl: 'panel/details/_panel.ticket.details.html',
                        controller: 'TicketDetailsController'
                    },
                    'panel': {
                        templateUrl: 'panel/details/_panel.ticket.details.html',
                        controller: 'TicketDetailsController'
                    }
                },
                data: {
                    active: 'ticket-details'
                },
                resolve: {
                    setContext: function(ContextService) {
                        return ContextService.setContext('ticketDetails');
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
