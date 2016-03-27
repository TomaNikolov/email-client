(function () {
    'use strict';

    function HomeController(mailService, crypto, $routeParams) {
        var vm = this;
        vm.mailbox = $routeParams.mailbox;
        if (!vm.mailbox) {
            mailService.getMailboxes()
                .then(function (mailboxes) {
                    console.log(mailboxes);
                    var path = mailboxes.result[0].path;
                    mailService.getMailboxMessages({path: path})
                        .then(function (msgs) {
                            console.log(msgs);
                            vm.messages = msgs;
                        });
                });
        } else {
            var path = {path: crypto.decode(vm.mailbox)};
            mailService.getMailboxMessages(path)
                .then(function (msgs) {
                    vm.messages = msgs;
                });
        }
    }

    angular.module('myApp.controllers')
        .controller('HomeController', ['mailService', 'crypto', '$routeParams', HomeController]);
}());