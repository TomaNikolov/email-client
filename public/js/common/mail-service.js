(function () {
    'use strict';

    function mailService(data) {

        function getMailboxMessages(path) {
            return data.get('api/getMailboxMessages', path)
        }

        function getMailboxes() {
            return data.get('api/getMailboxes')
        }

        function getMailboxChildren(path) {
            return data.get('api/getMailboxChildren', path)
        }

        return {
            getMailboxMessages: getMailboxMessages,
            getMailboxChildren: getMailboxChildren,
            getMailboxes: getMailboxes
        }
    }

    angular.module('myApp.services')
        .factory('mailService', ['data', mailService]);
}());
