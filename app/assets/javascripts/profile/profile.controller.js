(function () {
    'use strict';

    var app = angular.module('geotix');

    app.controller('ProfileController', ['$scope', 'ProfileService', profileController]);

    function profileController($scope, profileService) {
      $scope.newInfo = {};

      $scope.update = function(){
          var upUser ={
              user: $scope.user,
              username: $scope.newInfo.username,
              email: $scope.newInfo.email,
            };
          var password ={
            encrypted_password: $scope.newInfo.encrypted_password
          }
            profileService.updateProfile($scope.user.id,upUser);
            profileService.updatePassword(password);
      };
    }
})();
