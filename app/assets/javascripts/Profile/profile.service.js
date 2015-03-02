(function() {
  'use strict';

  var app = angular.module('geotix');

  app.factory('ProfileService', ['$http', '$q', profileService]);

  function profileService ($http, $q) {

    function updateProfile(userId, user) {
      var url = ['users', userId, 'update.json'].join('/'),
        deferred = $q.defer();

      $http.put(url, user).success(function(data) {
        deferred.resolve(data);
      }, function(error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function deleteProfile(userId) {
      var url = ['users', userId, 'destroy.json'].join('/'),
        deferred = $q.defer();

      $http.delete(url).success(function(data) {
        deferred.resolve(data);
      },
        function(error) {
          deferred.reject(error);
      });

      return deferred.promise;
    }

    return {
      updateProfile: updateProfile,
      deleteProfile: deleteProfile
    };
  }
})();
