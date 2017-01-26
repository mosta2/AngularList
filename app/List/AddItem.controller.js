
// Wrap Angular components in an Immediately Invoked Function Expression (IIFE)
(function () {
    'use strict';

    angular
        .module('app')
        .controller('AddItem', ['logger','dataservice','navigate', AddItem]);

    function AddItem(logger,dataservice,navigate) {
        var aic = this;
        aic.name = "";
        aic.order = null;
        aic.description = "";
        logger.success('App Initialized');


        aic.addItem = function () {
           
            dataservice.getNextid().then(function (id) {
                var nextid = id;

                var newitem = { id: nextid, name: aic.name, description: aic.description, order: aic.order, selected:false }
                logger.success(JSON.stringify(newitem));
                return dataservice.addItem(newitem).then(function (data) {

                    return navigate.gotopage('list');
                });
            });
        }



    }

})();