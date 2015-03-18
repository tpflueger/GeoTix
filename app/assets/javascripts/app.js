(function () {
  'use strict';

  var app = angular.module('geotix', ['ui.router', 'templates', 'Devise', 'ngDialog', 'uiGmapgoogle-maps']);

  app.run(['$rootScope', 'Auth', '$state', '$timeout', 'LoginService', controller]);

  function controller($rootScope, Auth, $state, $timeout, loginService) {
    $rootScope.$state = $state;
    $rootScope.loginTry = true;
    $rootScope.registerTry = false;

    $rootScope.signedIn = Auth.isAuthenticated;
    $rootScope.logout = Auth.logout;

    Auth.currentUser().then(function (user){
      $rootScope.user = user;
    });

    $rootScope.$on('devise:unauthorized', function(event, xhr, deferred) {
      loginService.openDialog();
    });

    $rootScope.$on('devise:new-registration', function (e, user){
      $rootScope.user = user;
    });

    $rootScope.$on('devise:login', function (e, user){
      $rootScope.user = user;
    });

    $rootScope.$on('devise:logout', function (e, user){
      $rootScope.user = {};
    });

    $rootScope.openLogin = function (modal) {
      if(modal === 'login') {
        $rootScope.loginTry = true;
        $rootScope.registerTry = false;
      } else {
        $rootScope.loginTry = false;
        $rootScope.registerTry = true;
      }
      loginService.openDialog();
    };
  }
})();
