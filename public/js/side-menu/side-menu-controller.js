(function () {
    'use strict';

    function SideMenuController() {
        var vm = this;
        vm.activeMenu = "Inbox";
    }

    angular.module('myApp.controllers')
        .controller('SideMenuController',[SideMenuController]);
}());
