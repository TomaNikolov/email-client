(function () {
    'use strict';

    function ComposeController($http) {
        var vm = this;
        vm.mail = {};
        vm.submit = function(mail) {
            $http.post('/api/sendmail', mail ).then(function(msg){
                console.log(msg);
            })
        };
    }

    angular.module('myApp.controllers')
        .controller('ComposeController',['$http',ComposeController]);
}());