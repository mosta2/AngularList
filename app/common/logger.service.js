// This service for logging app events it should be tied to the data service 
(function () {
    'use strict';

    angular.module('app')
    .factory('logger', logger);

    logger.$inject = ['$log'];
    function logger($log) {
        var service = {
            error: error,
            success: success,
            log: $log.log
        };

        return service;

        /////////////////////

        function error(message) {
            
            $log.error('Error: ' + message);
        }

        function success(message, data, title) {
            $log.info('Success: ' + message);
        }
    }

})();