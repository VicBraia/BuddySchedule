(function() {
    'use strict';

    angular
        .module('buddy-schedule')
        .controller('HomeCtrl', HomeCtrl);


        HomeCtrl.$inject = ['$scope', '$state', 'EventFactory', 'resolvedEvents'];

    /* @ngInject */
    function HomeCtrl($scope, $state, EventFactory, resolvedEvents) {
        var vm = this;

        vm.selectTab = function(setTab){
            vm.tab = setTab;            
          };
      
        vm.isTab = function(checkTab){
            return vm.tab === checkTab;
        }; 

        activate();
        
        function activate() {
            console.log(resolvedEvents);
            
            vm.tab = 1;
        }
    }
})();

        