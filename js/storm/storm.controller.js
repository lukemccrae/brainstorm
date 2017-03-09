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
        vm.$onInit = function() { //this gets the storm at stateparams.id
            $http({
                method: 'GET',
                url: `http://localhost:3000/${$stateParams.id}`,
            }).then(function successCallback(response) {
                vm.storm.name = response.data.data[0].name;
                vm.storm.id = response.data.data[0].id;
            }, function errorCallback(response) {
                console.log(response);
            });

            $http({
                method: 'GET',
                url: `http://localhost:3000/entry/${$stateParams.id}`,
            }).then(function successCallback(response) {
                vm.entries = response.data.data;
            }, function errorCallback(response) {
                console.log(response);
            });
        }

        vm.createEntry = function() {
            $http({
                    url: `http://localhost:3000/entry/${$stateParams.id}`,
                    method: "POST",
                    data: vm.entry
                })
                .then(function(response) {
                        // console.log(response);
                        vm.getEntries();
                    },
                    function(response) {
                        console.log(response);
                    });
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
