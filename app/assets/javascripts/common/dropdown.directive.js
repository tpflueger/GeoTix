(function () {
    'use strict';

    var app = angular.module('geotix');

    app.directive('dropdown',[dropdown]);

    function dropdown() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.dropdown();
            }
        }
    }
})();