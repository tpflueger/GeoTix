(function () {
  'use strict';

  var app = angular.module('geotix', ['ui.router', 'templates', 'Devise', 'ngDialog']);

  app.run(['$rootScope', 'Auth', 'ngDialog', '$state', controller]);

  function controller($rootScope, Auth, ngDialog, $state) {

    $rootScope.person = {};
    $('.dropdown').dropdown();

    $rootScope.signedIn = Auth.isAuthenticated;
    $rootScope.logout = Auth.logout;

    Auth.currentUser().then(function (user){
      $rootScope.user = user;
    });

    $rootScope.$on('devise:unauthorized', function(event, xhr, deferred) {
      ngDialog.open({
        template: 'auth/_login.html'
      });
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

    $rootScope.openSidebar = function () {
      $('.ui.sidebar').sidebar('toggle');
    }

    $rootScope.login = function() {
      Auth.login($rootScope.person).then(function(){
        $state.go('home');
        ngDialog.close();
      });
    };

    $rootScope.register = function() {
      Auth.register($rootScope.user).then(function(){
        $state.go('home');
      });
    };
  }
})();
