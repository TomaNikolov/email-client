(function () {
    'use strict';

    function HomeController() {
        var vm = this;
        vm.activeMenu = "Inbox";
    }

    angular.module('myApp.controllers')
        .controller('HomeController',[HomeController]);
}());