(function() {
    'use strict'

    angular.module('app')
        .component('storm', {
            controller: controller,
            templateUrl: '/js/storm/storm.component.html'
        })

    function controller($http, $state, $stateParams) {
        const vm = this;
        vm.storm = {};
        vm.entry = {
            storm_id: $stateParams.id
        };
        vm.entries = [];
        vm.messages = [];
        vm.$onInit = function() {
            // GET the storm
            $http.get(`http://localhost:3000/${$stateParams.id}`).then(function(response) {
                vm.storm.name = response.data.data[0].name;
                vm.storm.id = response.data.data[0].id;
            });
            // GET storm entries by storm_id
            $http.get(`http://localhost:3000/entry/${$stateParams.id}`).then(function(response) {
                vm.entries = response.data.data;
            });
        }

        vm.createEntry = function() {
            // POST new entry to the database
            $http.post(`http://localhost:3000/entry/${$stateParams.id}`, vm.entry)
                .then(function(response) {
                    vm.getEntries()
                })
        }

        vm.getEntries = function() {
            $http({
                method: 'GET',
                url: `http://localhost:3000/entry/${$stateParams.id}`,
            }).then(function successCallback(response) {
                var entryData = response.data.data;
                var newData = entryData.length - 1;
                for (var i = newData; i < entryData.length; i++) {
                    vm.entries.push(entryData[i])
                }
            }, function errorCallback(response) {
                console.log(response);
            });
        }
    }

}());
