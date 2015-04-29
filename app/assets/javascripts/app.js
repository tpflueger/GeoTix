(function () {
  'use strict';

  var app = angular.module('geotix', ['ui.router', 'templates', 'Devise', 'ngDialog', 'uiGmapgoogle-maps']);

  app.run(['$rootScope', 'Auth', '$state', 'LoginService', 'ContextService', controller]);

  function controller($rootScope, Auth, $state, loginService, contextService) {
    $rootScope.$state = $state;
    $rootScope.loginTry = true;
    $rootScope.registerTry = false;
    $rootScope.contextService =  contextService;

    $rootScope.signedIn = Auth.isAuthenticated;
    $rootScope.logout = Auth.logout;

    Auth.currentUser().then(function (user){
      $rootScope.user = user;
    });

    $rootScope.$on('devise:unauthorized', function(event, xhr, deferred) {
      $state.go('home.search');
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
      $state.go('home.search');
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

    $rootScope.previousState;
    $rootScope.currentState;
    $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
      $rootScope.previousState = from.name;
      $rootScope.currentState = to.name;
      contextService.setContext($rootScope.currentState);
    });
  }
})();
