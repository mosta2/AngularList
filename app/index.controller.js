// Wrap Angular components in an Immediately Invoked Function Expression (IIFE)
(function () {
    'use strict';

    angular
        .module('app')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['dataservice', 'logger','navigate'];


    function IndexController(dataservice, logger,navigate) {
        var ic = this;
        
        //Sample navigation please use this to navigate using the service
        ic.gotopage = function gotopage(view) {
            navigate.gotopage(view);
        };

        
    }

})();