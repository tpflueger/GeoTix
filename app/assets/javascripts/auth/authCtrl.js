(function () {
  'use strict';

  var app = angular.module('geotix');

  app.controller('AuthCtrl', ['$scope', '$state', 'Auth', authCtrl]);

  function authCtrl($scope, $state, Auth) {
    $scope.login = function() {
      Auth.login($scope.user).then(function(){
        $state.go('home');
      });
    };

    $scope.register = function() {
      Auth.register($scope.user).then(function(){
        $state.go('home');
      });
    };
  }
})();