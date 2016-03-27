(function () {
    'use strict';

    function SideMenuController(data) {
        var vm = this;
        vm.activeMenu = "Inbox";
        data.get('api/getMailboxes')
        .then(function(mailboxes){
            console.log(mailboxes)
        })
    }

    angular.module('myApp.controllers')
        .controller('SideMenuController',['data', SideMenuController]);
}());
