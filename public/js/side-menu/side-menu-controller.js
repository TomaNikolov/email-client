(function () {
    'use strict';

    function SideMenuController($location, data) {
        var vm = this;

        data.get('api/getMailboxes')
            .then(function (mailboxes) {
                vm.mailboxes = mailboxes;
                vm.activeMenu = vm.mailboxes.result[0].name;
                var path = vm.mailboxes.result[0].path;
                vm.mailboxes.result.forEach(function (mailbox) {
                    console.log(mailbox);

                    console.log("mailbox: :" + mailbox.hasChildren);
                    if (mailbox.hasChildren) {
                        console.log('inside')
                        data.get('api/getMailboxChildren', {path: mailbox.path})
                            .then(function (children) {
                                mailbox.children = children.result;
                                console.log(children)
                                $location.path('/' + path)
                            });
                    }
                });
            });

        

        vm.encode = function(url){
            return window.encodeURIComponent(url);
        }
    }

    angular.module('myApp.controllers')
        .controller('SideMenuController', ['$location', 'data', SideMenuController]);
}());
