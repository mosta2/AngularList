// Config define the routes and themes 
(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

     
    function config($routeProvider, $mdThemingProvider) {


        $routeProvider
        .when("/list", {
            templateUrl: "app/List/List.html",
            controller: "List",
            controllerAs: "lc"
        })
        .when("/addItem", {
            templateUrl: "/app/List/addItem.html",
            controller: "AddItem",
            controllerAs: "aic"
        })
        .when("/", {
            templateUrl: "/home.html"
        })
        .when("/home", {
            templateUrl: "/home.html"
        })

            $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
            $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
            $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
            $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
            $mdThemingProvider.theme('orange').backgroundPalette('orange');

    }
    
})();
