(function () {
    'use strict';

    function HomeController(data, $routeParams) {
        var vm = this;
        vm.mailbox = $routeParams.mailbox;
        vm.activeMenu = "Inbox";
        vm.messages = {};
        data.get('api/getMailboxMessages',{path: vm.mailbox})
           .then(function(msgs) {
           vm.messages = msgs;
        });

    }

    angular.module('myApp.controllers')
        .controller('HomeController',['data','$routeParams',HomeController]);
}());