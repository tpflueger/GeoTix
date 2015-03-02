(function () {
  'use strict';

  var app = angular.module('geotix', ['ui.router', 'templates', 'Devise', 'ngDialog']);

  app.run(['$rootScope', 'Auth', 'ngDialog', '$state', 'TicketService', 'ProfileService', controller]);

  function controller($rootScope, Auth, ngDialog, $state, ticketService, profileService) {
    console.log(profileService);

    $rootScope.profile = profileService;

    $rootScope.loginTry = true;
    $rootScope.registerTry = false;

    $rootScope.ticket = {};
    $rootScope.registerUser = {};
    $rootScope.person = {};
    $('.dropdown').dropdown();

    ticketService.getTickets().then(function(tickets) {
      console.log(tickets);
    }, function(error) {
      console.log(error);
    });

    $rootScope.signedIn = Auth.isAuthenticated;
    $rootScope.logout = Auth.logout;

    Auth.currentUser().then(function (user){
      $rootScope.user = user;

      ticketService.getUserTickets($rootScope.user.id).then(function(userTickets) {
        console.log(userTickets);
      }, function(error) {
        console.log(error);
      });
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
      Auth.register($rootScope.registerUser).then(function(){
        $state.go('home');
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
      ngDialog.open({
          template: 'auth/_login.html'
      });
    };

    $rootScope.submitTicket = function() {
      ticketService.createUserTicket($rootScope.user.id, $rootScope.ticket).then(function(data) {
        console.log(data);
      }, function(error) {
        console.log(error);
      });
    };
  }
})();
