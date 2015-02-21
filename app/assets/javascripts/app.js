(function () {
  'use strict';

  var app = angular.module('geotix', ['ui.router', 'templates', 'Devise']);

  app.run(function() {
    console.log("init");
  });
})();
