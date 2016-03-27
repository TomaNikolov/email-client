(function () {
    'use strict';

    function ComposeController($http, $location) {
        var vm = this;
        vm.mail = {};
        vm.submit = function(mail) {
            $http.post('/api/sendmail', mail ).then(function(msg){
                console.log(msg);
                $location.path('/');
            })
        };
    }

    angular.module('myApp.controllers')
        .controller('ComposeController',['$http', '$location',ComposeController]);
}());