(function() {
    'use strict';

    angular
        .module('buddy-schedule')
        .factory('CalendarFactory', CalendarFactory);

    CalendarFactory.$inject = ['$firebaseArray','$firebaseObject'];

    /* @ngInject */
    function CalendarFactory($firebaseArray, $firebaseObject, $filter) {
      var calendarRootRef = firebase.database().ref().child("calendar");
      var calendarList = $firebaseArray(calendarRootRef);

        var service = {
            addEvent: addEvent,
            getAll: getAll,
            getAllSorted, getAllSorted,
            getById: getById,
            edit: edit,
            remove: remove
        };

        return service;

        function getById(eventId){
          var eventRef = calendarRootRef.child(eventId);
          var event = $firebaseObject(eventRef);
          return event;
        }
        
        function addEvent(event){
          return calendarList.$add(event);
        }
        
        function getAll() {
          return calendarList;
        }

        function getAllSorted(){
          var sortedCalendarListRef = calendarRootRef.orderByChild('date');
          var sortedCalendarList = $firebaseArray(sortedCalendarListRef);               
          return sortedCalendarList;
        }

        function getById(id){
          var calendarRef = calendarRootRef.child(id);
          var calendar = $firebaseObject(calendarRef);
          return calendar;
        }

        function edit(day){
          return day.$save();
        }
        function remove(day){
          return calendarList.$remove(day);
        }

      }
})();
