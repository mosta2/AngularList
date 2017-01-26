
// Wrap Angular components in an Immediately Invoked Function Expression (IIFE)
(function () {
    'use strict';

    angular
        .module('app')
        .controller('List', List);

    List.$inject = ['dataservice', 'logger', 'navigate', '$mdDialog', '$filter'];


    function List(dataservice, logger, navigate, $mdDialog, $filter) {
        var lc = this;
        lc.items = [];
        lc.ready = false;
        lc.currentItem = null;
        lc.selectedcount = 0;
        logger.success('App Initialized');

        getlist();
        
        lc.moveup = function (idx) {
            return dataservice.moveup(idx).then(function (data) {
                lc.items = data;
                return lc.items;
            });
        }
        lc.movedown = function (idx) {
            return dataservice.movedown(idx).then(function (data) {
                lc.items = data;
                return lc.items;
            });
        }
        lc.updateItem = function (idx,name) {
            return dataservice.updateItem(idx,name).then(function (data) {
                lc.items = data;
                return lc.items;
            });
        }
        
        lc.deleteItem = function (idx) {
            return dataservice.deleteItem(idx).then(function (data) {
                lc.items = data;
                return lc.items;
            });
            
        }
        lc.deleteselected = function (idx) {
            for (var i = 0; i < lc.items.length; i++) {
                if (lc.items[i].selected) {
                    lc.deleteItem(lc.items[i].id);

                }
            }
        }

        lc.gotopage = function (view) {
            navigate.gotopage(view);
        }

        lc.selectItem = function (idx) {
            var ind = lc.items.indexOf($filter('filter')(lc.items, { id: idx }, true)[0]);
            lc.items[ind].selected = !lc.items[ind].selected;
            lc.selectedcount = $filter('filter')(lc.items, { selected: true }, true).length;
        }


        lc.showPrompt = function (id) {
            // Appending dialog to document.body to cover sidenav in docs app
            //alert(JSON.stringify(ev));
            lc.currentItem = id;
            var confirm = $mdDialog.prompt()
              .title("Rename this element?")
              .placeholder('Element name')
              .ok('Rename')
              .cancel('Cancel');

            $mdDialog.show(confirm).then(function (result) {
                
                lc.updateItem(lc.currentItem, result);
            }, function () {
                
            });
        };


        function getlist() {
            return dataservice.getItems().then(function (data) {
                lc.items = data;
                lc.ready = true;
                return lc.items;
            });
        }


      


    }

})();