(function () {
    'use strict';

    function DetailsController(data, $routeParams,$sce) {
        var vm = this;
        vm.message = {};
        vm.msgAsHtml = '';

        data.get('api/getMessage',{path: $routeParams.mailbox, uid: $routeParams.uid })
            .then(function(msg) {
                    vm.message = msg;
                    vm.msgAsHtml = $sce.trustAsHtml(msg.result.html);
            });
    }

    angular.module('myApp.controllers')
        .controller('DetailsController',['data','$routeParams','$sce',DetailsController]);
}());