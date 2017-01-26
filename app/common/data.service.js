(function () {
    'use strict';

    angular.module('app')
    .factory('dataservice', dataservice);
    
    function dataservice($q,$filter) {
        
        var service = {
            getItems: getItems,
            saveItems: saveItems,
            addItem: addItem,
            moveup: moveup,
            movedown: movedown,
            deleteItem: deleteItem,
            updateItem: updateItem,
            getNextid: getNextid
            
        };

        return service;

        /////////////////////

        function getItems() {

            var deferred = $q.defer();
            var storage = localStorage.getItem("items");
            var list = []
            if (storage.length > 0) {
                try {
                    list = JSON.parse(storage);
                } catch (e) { }
            }


            deferred.resolve(list);
            return deferred.promise;
        }


        function saveItems(data) {
            localStorage.setItem("items", JSON.stringify(data));
        }

        function addItem(item) {
            var deferred = $q.defer();
            var items = [];

            getItems().then(function (data) {
                items = data;
                items.push(item);
                saveItems(items);
                deferred.resolve(items);
                
            });
            return deferred.promise;
            
        }

        function moveup(idx) {
            var deferred = $q.defer();
            var items = [];
            alert(idx);
            getItems().then(function (data) {
                items = data;
                var ind = items.indexOf($filter('filter')(items, { id: idx }, true)[0]);
                items[ind].order = items[ind].order-1;
                saveItems(items);
                deferred.resolve(items);

            });
            return deferred.promise;

        }
        function movedown(idx) {
            var deferred = $q.defer();
            var items = [];
            getItems().then(function (data) {
                items = data;
                var ind = items.indexOf($filter('filter')(items, { id: idx }, true)[0]);
                items[ind].order = items[ind].order + 1;
                saveItems(items);
                deferred.resolve(items);

            });
            return deferred.promise;

        }
        function deleteItem(idx) {
            var deferred = $q.defer();
            var items = [];
            getItems().then(function (data) {
                items = data;
                var ind = items.indexOf($filter('filter')(items, { id: idx }, true)[0]);
                items.splice(ind, 1);
                saveItems(items);
                deferred.resolve(items);
                
            });
            return deferred.promise;

        }

        function updateItem(idx,name) {
            var deferred = $q.defer();
            var items = [];
            getItems().then(function (data) {
                items = data;
                var ind = items.indexOf($filter('filter')(items, { id: idx }, true)[0]);
                items[ind].name = name;
                saveItems(items);
                deferred.resolve(items);

            });
            return deferred.promise;

        }
        function getNextid() {
            var deferred = $q.defer();
            var items = [];
            var id = -1;
            getItems().then(function (data) {
                items = data;
                id = items.length + 1;;
                deferred.resolve(id);
            });
            return deferred.promise;

        }
    }

})();