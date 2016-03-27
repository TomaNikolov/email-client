(function () {
    'use strict';

    function config($routeProvider) {

        var PARTIALS_PREFIX = 'views/partials/';
        var CONTROLLER_AS_VIEW_MODEL = 'vm';


        $routeProvider
            .when('/outbox',{
                templateUrl: PARTIALS_PREFIX + 'outbox/outbox.html',
                controller: 'OutboxController',
                controllerAs: CONTROLLER_AS_VIEW_MODEL
            })
            .when('/details/:mailbox/:uid',{
                templateUrl: PARTIALS_PREFIX + 'details/details.html',
                controller: 'DetailsController',
                controllerAs: CONTROLLER_AS_VIEW_MODEL
            })
            .when('/compose',{
                templateUrl: PARTIALS_PREFIX + 'compose/compose.html',
                controller: 'ComposeController',
                controllerAs: CONTROLLER_AS_VIEW_MODEL
            })
            .when('/:mailbox', {
                templateUrl: PARTIALS_PREFIX + 'home/home.html',
                controller: 'HomeController',
                controllerAs: CONTROLLER_AS_VIEW_MODEL
            })
            .when('/', {
                templateUrl: PARTIALS_PREFIX + 'home/home.html',
                controller: 'HomeController',
                controllerAs: CONTROLLER_AS_VIEW_MODEL
            })
            .otherwise({ redirectTo: '/' });


    }

    angular.module('myApp.services', []);
    angular.module('myApp.directives', []);
    angular.module('myApp.controllers', ['myApp.services']);
    angular.module('myApp', ['ngRoute', 'ngCookies', 'myApp.directives', 'myApp.controllers'])
        .config(['$routeProvider', config])
        .value('CryptoJS', CryptoJS)
        .constant('baseServiceUrl', 'http://localhost:3005');
}());