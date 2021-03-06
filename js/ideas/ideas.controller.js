(function() {
    'use strict'

    angular.module('app')
        .component('ideas', {
            controller: controller,
            templateUrl: '/js/ideas/ideas.component.html'
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
                    vm.entry.content = null;
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

        vm.updateEntry = function(entry) {
            console.log(entry);
            $http.put(`http://localhost:3000/entry/${entry.id}`, entry).then(function(response) {
                    console.log(response);
                })
                .catch(function(response) {
                    console.log(response);
                })
        }

        vm.deleteEntry = function(entry) {
            $http.delete(`http://localhost:3000/entry/${entry.id}`).then(function(response) {});
        }

        vm.govotechat = function(entry) {
            $state.go('votechat', {
                "id": $stateParams.id,
                ideas: vm.entries
            })
        }
    }

}());
