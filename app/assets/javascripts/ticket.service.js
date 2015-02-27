(function() {
    'use strict';

    var app = angular.module('geotix');

    app.factory('TicketService', ['$http', '$q', ticketService]);

    function ticketService ($http, $q) {

        function getTickets() {
            var url = ['tickets.json'].join('/'),
                deferred = $q.defer();

            $http.get(url).success(function(data) {
                deferred.resolve(data);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function getUserTickets (userId) {
            var url = ['users', userId, 'tickets.json'].join('/'),
                deferred = $q.defer();

            $http.get(url).success(function(data) {
                deferred.resolve(data);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function updateUserTicket () {

        }

        function deleteUserTicket() {

        }

        function createUserTicket(userId, ticket) {
            var url = ['users', userId, 'tickets.json'].join('/'),
                deferred = $q.defer();

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