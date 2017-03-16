(function() {
    'use strict'

    angular.module('app')
        .component('create', {
            controller: controller,
            templateUrl: '/js/create/create.component.html'
        })

    function controller($state, $http, $stateParams) {
        controller.$inject = ['$http']
        const vm = this;
        vm.createStorm = function() {
            vm.create = {
                name: vm.storm.name,
                date: new Date()
            }
            $http.post('http://localhost:3000/', vm.create)
                .then(function(response) {
                    $state.go('storm', {
                        "id": response.data
                    })
                })
        }
    }
}());
