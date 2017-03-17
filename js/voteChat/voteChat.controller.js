(function() {
    'use strict'

    angular.module('app')
        .component('votechat', {
            controller: controller,
            templateUrl: '/js/votechat/votechat.component.html'
        })

    function controller($http, $state, $stateParams) {
        const vm = this;
        vm.ideas = [];
        vm.messages = [];
        vm.chatMessage = {
            storm_id: $stateParams.id
        }
        vm.$onInit = function() {
            $http.get(`http://localhost:3000/entry/${$stateParams.id}`).then(function(response) {
                vm.ideas = response.data.data;
                vm.chat()
            });
        }
        //gets chat for storm
        vm.chat = function() {
            $http.get(`http://localhost:3000/chat/${$stateParams.id}`).then(function(response) {
                vm.messages = response.data.data
            });
        }
        //posts chat messages to the db
        vm.postChat = function() {
            $http.post(`http://localhost:3000/votechat/${$stateParams.id}`, vm.chatMessage) // need to fix this part, cant post data
                .then(function(response) {
                    vm.chatMessage.content = null;
                })
                .catch(function(response) {
                    console.log(response);
                })
        }
        //upvotes the idea clicked on
        vm.upVote = function(idea) {
            var newVotes = {
                votes: idea.votes + 1
            }
            $http.put(`http://localhost:3000/entry/upvote/${idea.id}`, newVotes).then(function(response) {
                    console.log(response);
                })
                .catch(function(response) {
                    console.log(response);
                })
        }

    }

}());
