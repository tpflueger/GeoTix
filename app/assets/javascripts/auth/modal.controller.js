(function () {
    'use strict';

    var app = angular.module('geotix');

    app.controller('ModalController', ['$scope', '$state', 'Auth', 'LoginService', modalController]);

    function modalController($scope, $state, Auth, loginService) {
        $scope.person = {};
        $scope.registerUser = {};
        $scope.login = function() {
            Auth.login($scope.person).then(function(){
                loginService.closeDialog();
                $state.go('home.search');
            });
        };

        $scope.register = function() {
            Auth.register($scope.registerUser).then(function(){
                loginService.closeDialog();
                $state.go('home.search');
            });
        };
    }
})();