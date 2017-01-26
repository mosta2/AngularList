(function () {
    'use strict';

    angular.module('app')
    .factory('logger', logger)

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
            
            $log.error('Error: ' + message, data);
        }

        function success(message, data, title) {
            $log.info('Success: ' + message, data);
        }
    }

})();