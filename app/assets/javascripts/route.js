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
                    'panel@home': {
                        templateUrl: 'auth/_register.html'
                    }
                }
            })
            .state('home.tickets', {
                url: '/tickets',
                views: {
                    'panel@home': {
                        templateUrl: ''
                    }
                }
            })
            .state('home.tickets-create', {
                url: '/tickets/create',
                views: {
                    'panel@home': {
                        templateUrl: ''
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