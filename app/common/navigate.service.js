(function () {
    'use strict';

    angular.module('app')
    .factory('navigate', navigate);
    
    navigate.$inject = ['$location'];
    function navigate($location) {
        
        var service = {
            gotopage: gotopage
            
        };

        return service;

        /////////////////////

        function gotopage(page) {
            $location.path(page);
        }

    }

})();