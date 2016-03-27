(function () {
    'use strict';

    function SideMenuController($location, crypto, mailService) {
        var vm = this;

        mailService.getMailboxes()
            .then(function (mailboxes) {
                vm.mailboxes = mailboxes;
                vm.activeMenu = vm.mailboxes.result[0].name;
                var path = vm.mailboxes.result[0].path;
                vm.mailboxes.result.forEach(function (mailbox) {
                    if (mailbox.hasChildren) {
                        mailService.getMailboxChildren({path: mailbox.path})
                            .then(function (children) {
                                mailbox.children = children.result;
                              //  $location.path('/' + path)
                            });
                    }
                });
            });

        vm.encode = function (url) {
            var ee = crypto.encode(url);
            console.log(ee);
            return ee;
        }
    }

    angular.module('myApp.controllers')
        .controller('SideMenuController', ['$location', 'crypto', 'mailService', SideMenuController]);
}());
