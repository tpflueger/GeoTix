(function () {
  'use strict';

  var app = angular.module('geotix', ['ui.router', 'templates', 'Devise', 'ngDialog', 'uiGmapgoogle-maps']);

  app.run(['$rootScope', 'Auth', 'ngDialog', '$state', '$timeout', controller]);

  function controller($rootScope, Auth, ngDialog, $state, $timeout) {
    $rootScope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    $rootScope.$state = $state;
    $rootScope.isDialogOpen = false;
    $rootScope.loginTry = true;
    $rootScope.registerTry = false;

    $rootScope.ticket = {};
    $rootScope.registerUser = {};
    $rootScope.person = {};

    $rootScope.signedIn = Auth.isAuthenticated;
    $rootScope.logout = Auth.logout;

    Auth.currentUser().then(function (user){
      $rootScope.user = user;
    });

    $rootScope.$on('devise:unauthorized', function(event, xhr, deferred) {
      if(!$rootScope.isDialogOpen) {
        ngDialog.openConfirm({
          template: 'auth/_login.html',
          showClose: false
        });
        $rootScope.isDialogOpen = true;
      }
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


    $rootScope.login = function() {
      Auth.login($rootScope.person).then(function(){
        $rootScope.isDialogOpen = false;
        $state.go('home.search');
        ngDialog.close();
      });
    };

    $rootScope.register = function() {
      Auth.register($rootScope.registerUser).then(function(){
        $rootScope.isDialogOpen = false;
        $state.go('home.search');
        ngDialog.close();
      });
    };

    $rootScope.openLogin = function (modal) {
      if(modal === 'login') {
        $rootScope.loginTry = true;
        $rootScope.registerTry = false;
      } else {
        $rootScope.loginTry = false;
        $rootScope.registerTry = true;
      }
      if(!$rootScope.isDialogOpen) {
        ngDialog.openConfirm({
          template: 'auth/_login.html',
          showClose: false
        });
        $rootScope.isDialogOpen = true;
      }
    };

    //Some reason with menu being placed in subview, it can't find it until fully initialized
    $timeout(function() {
      $('.dropdown').dropdown();
    });
  }
})();
