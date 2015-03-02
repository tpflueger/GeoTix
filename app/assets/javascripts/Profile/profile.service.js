(function() {
  'use strict';

  var app = angular.module('geotix');

  app.factory('ProfileService', ['$http', '$q', profileService]);

  function profileService ($http, $q) {

    function updateProfile(userId, user) {
      var url = ['users', userId, 'update.json'].join('/'),
        deffered = $q.defer();

      $http.put(url, user).success(function(data) {
        deferred.resolve(data);
      }, function(error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function deleteProfile(userId, user) {
      
    }

    return {
      updateProfile: updateProfile,
      deleteProfile: deleteProfile
    };
  }
})();
