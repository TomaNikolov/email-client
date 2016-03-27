(function () {
    'use strict';

    function DetailsController(data, crypto, $routeParams,$sce) {
        var vm = this;
        var path = crypto.decode($routeParams.mailbox);
        vm.message = {};
        vm.msgAsHtml = '';

        data.get('api/getMessage',{path: path, uid: $routeParams.uid })
            .then(function(msg) {
                    vm.message = msg;
                    vm.msgAsHtml = $sce.trustAsHtml(msg.result.html);
            });
    }

    angular.module('myApp.controllers')
        .controller('DetailsController',['data', 'crypto', '$routeParams','$sce',DetailsController]);
}());