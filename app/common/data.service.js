// This service for all database work, it always uses promises, ready to be extended for server side API calls
//Currently it uses localStorage
(function () {
    'use strict';

    angular.module('app')
    .factory('dataservice', dataservice);
    
    function dataservice($q, $filter, $mdToast) {
        
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
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Item Added Successfuly!')
                    .hideDelay(3000)
                );
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
                $filter('filter')(items, { id: idx }, true)[0].order = $filter('filter')(items, { id: idx }, true)[0].order - 1;
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
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Item Deleted Successfuly!')
                    .hideDelay(3000)
                );
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
                var maxid = 0;
                for (var i = 0; i < items.length; i++)
                {
                    if(items[i].id  > maxid)
                    {
                        maxid = items[i].id
                    }
                }
                id = maxid + 1;;
                deferred.resolve(id);
            });
            return deferred.promise;

        }
    }

})();