(function () {
  'use strict';

  var app = angular.module('geotix', ['ui.router', 'templates', 'Devise', 'ngDialog', 'uiGmapgoogle-maps']);

  app.run(['$rootScope', 'Auth', 'ngDialog', '$state', 'TicketService', '$timeout', '$window', controller]);

  function controller($rootScope, Auth, ngDialog, $state, ticketService, $timeout, $window) {
    $rootScope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    $rootScope.$state = $state;
    $rootScope.isDialogOpen = false;
    $rootScope.loginTry = true;
    $rootScope.registerTry = false;

    $rootScope.ticket = {};
    $rootScope.registerUser = {};
    $rootScope.person = {};

    ticketService.getTickets().then(function(tickets) {
      $rootScope.allTickets = tickets;
    }, function(error) {
      console.log(error);
    });

    $rootScope.signedIn = Auth.isAuthenticated;
    $rootScope.logout = Auth.logout;

    Auth.currentUser().then(function (user){
      $rootScope.user = user;

      ticketService.getUserTickets($rootScope.user.id).then(function(userTickets) {
        $rootScope.userTickets = userTickets;
      }, function(error) {
        console.log(error);
      });
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

    $rootScope.openSidebar = function () {
      $('.ui.sidebar').sidebar('toggle');
    }

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

    $rootScope.submitTicket = function() {
      ticketService.createUserTicket($rootScope.user.id, $rootScope.ticket).then(function(data) {
        console.log(data);
      }, function(error) {
        console.log(error);
      });
    };

    //Some reason with menu being placed in subview, it can't find it until fully initialized
    $timeout(function() {
      $('.dropdown').dropdown();
    });

    $window.navigator.geolocation.getCurrentPosition(function(position) {
      $rootScope.map.center.latitude = position.coords.latitude;
      $rootScope.map.center.longitude = position.coords.longitude;
      $rootScope.map.zoom = 12;
      $timeout(function () {
        var map = document.getElementById('map_canvas');
        angular.element(map).triggerHandler('click');
      }, 0);
    }, function(error) {
      console.log(error);
    }, {
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 30000
    });

  }
})();
