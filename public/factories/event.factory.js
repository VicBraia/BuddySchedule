(function() {
    'use strict';

    angular
        .module('buddy-schedule')
        .factory('EventFactory', EventFactory);

    EventFactory.$inject = ['$firebaseArray','$firebaseObject'];

    /* @ngInject */
    function EventFactory($firebaseArray, $firebaseObject, $filter) {
      var eventRootRef = firebase.database().ref().child("event");
      var eventList = $firebaseArray(eventRootRef);

        var service = {
            getAll: getAll,
            getById: getById,
            add: add,
            edit: edit,
            remove: remove
        };

        return service;

        function getAll() {
          return eventList;
        }

        function getById(id){
          var eventRef = eventRootRef.child(id);
          var event = $firebaseObject(eventRef);
          return event;
        }

        function add(event){
          return eventList.$add(event);
        }

        function edit(event){
          return event.$save();
        }
        function remove(event){
          return eventList.$remove(event);
        }

        function getAllsubItems(event) {
          return person.subItems;
        }

      }
})();
