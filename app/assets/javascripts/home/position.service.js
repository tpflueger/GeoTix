(function () {
    'use strict';

    var app = angular.module('geotix');

    app.factory('PositionService', ['$q', '$window', positionService]);

    function positionService($q, $window) {
        function getCurrentPosition () {
            var userCircle = null,
                deferred = $q.defer();

            $window.navigator.geolocation.getCurrentPosition(function(position) {
                userCircle = {
                    center: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    },
                    radius: 20,
                    stroke: {
                        color: '#FFFFFF',
                        weight: 2,
                        opacity: 1
                    },
                    fill: {
                        color: '#1f08b2',
                        opacity: 0.5
                    }
                }
                deferred.resolve(userCircle);
            });

            return deferred.promise;
        }

        function getMapPosition () {
            var deferred = $q.defer();

            $window.navigator.geolocation.getCurrentPosition(function(position) {
               deferred.resolve(position);
            });

            return deferred.promise;
        }


        return {
            getCurrentPosition: getCurrentPosition,
            getMapPosition: getMapPosition
        };
    }
})();