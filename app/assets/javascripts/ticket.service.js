(function() {
    'use strict';

    var app = angular.module('geotix');

    app.factory('TicketService', ['$http', '$q', ticketService]);

    function ticketService ($http, $q) {

        function getTickets() {
            var url = ['tickets'].join('/'),
                deferred = $q.defer();

            $http.get(url).success(function(data) {
                deferred.resolve(data);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function getUserTickets (userId) {
            var url = ['users', userId, 'tickets'].join('/'),
                deferred = $q.defer();

            $http.get(url).success(function(data) {
                deferred.resolve(data);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function updateUserTicket(userId, ticketId, ticket) {
            // http://localhost:3000/users/:userId/tickets/:ticketId.json
            var url = ['users', userId, 'tickets', ticketId].join('/'),
                deferred = $q.defer();

            $http.put(url, ticket).success(function(data) {
                deferred.resolve(data);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function deleteUserTicket(userId, ticketId) {
            // http://localhost:3000/users/:/userId/tickets/:ticketId.json
            var url = ['users', userId, 'tickets', ticketId].join('/'),
                deferred = $q.defer();

            $http.delete(url).success(function(data) {
                deferred.resolve(data);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function createUserTicket(userId, ticket) {
            var url = ['users', userId, 'tickets'].join('/'),
                deferred = $q.defer();

            // Request with object.
            // We can chain methods using promises
            // parameters for a promise is success, error
            // $http.post().success(success,error);
            $http.post(url, ticket).success(function(data) {
                deferred.resolve(data);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        return {
            getTickets: getTickets,
            getUserTickets: getUserTickets,
            updateUserTicket: updateUserTicket,
            deleteUserTicket: deleteUserTicket,
            createUserTicket: createUserTicket
        };
    }
})();
