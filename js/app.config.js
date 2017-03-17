(function() {
    'use strict';

    angular.module('app').config(config)

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']
    //
    function config($stateProvider, $urlRouterProvider, $locationProvider, $http) {
        $locationProvider.html5Mode(true)
        $stateProvider
            .state({
                name: 'create',
                url: '/',
                component: 'create',
            })
            .state({
                name: 'ideas',
                url: '/:id',
                component: 'ideas',
            })
            .state({
                name: 'votechat',
                url: '/:id/votechat',
                component: 'votechat',
                params: {
                    ideas: null
                }
            })
        $urlRouterProvider.otherwise('/')
    }
}());
