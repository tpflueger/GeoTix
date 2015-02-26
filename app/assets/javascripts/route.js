(function () {
    'use strict';

    var app = angular.module('geotix');

    app.config(['$stateProvider', '$urlRouterProvider', routes]);

    function routes ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'home/_home.html',
                controller: 'MainCtrl'
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'profile/_profile.html',
                controller: 'ProfileController'
            });

        $urlRouterProvider.otherwise('home');
    }
})();