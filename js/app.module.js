(function() {
    'use strict'

    angular.module('app', ['ui.router', 'btford.socket-io'])
        .factory('messageSocket', ['socketFactory', function(socketFactory) {
            return socketFactory();
        }])
}());
