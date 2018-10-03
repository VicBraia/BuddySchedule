(function() {
    'use strict';

    angular
        .module('buddy-schedule')
        .controller('HomeCtrl', HomeCtrl);


        HomeCtrl.$inject = ['$scope', '$state', 'EventFactory', 'CalendarFactory', 'resolvedEvents'];

    /* @ngInject */
    function HomeCtrl($scope, $state, EventFactory, CalendarFactory, resolvedEvents) {
        var vm = this;
        vm.dayDetails = getDayDetails;
        vm.setDetails = setDetails;
        vm.saveAddition = saveAddition;
        vm.eventToBeAdded = new Object();

        vm.selectTab = function(setTab){
            vm.tab = setTab;            
          };
      
        vm.isTab = function(checkTab){
            return vm.tab === checkTab;
        }; 

        activate();
        
        function activate() {            
            vm.tab = 1;
        }

        function getDayDetails(){
            
        }

        function setDetails(day, month, year){
            vm.dayDetailed = day + '/' + month + '/' + year;  
            console.log(vm.dayDetailed);
        }

        function saveAddition(){
            vm.eventToBeAdded.date = vm.dayDetailed;
            CalendarFactory.addEvent(vm.eventToBeAdded);
            vm.eventToBeAdded = null;
        }
    }

})();

        