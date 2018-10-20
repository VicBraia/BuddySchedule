(function () {
    'use strict';

    angular
        .module('buddy-schedule')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$state'];

    /* @ngInject */
    function HomeCtrl($scope, $state) {
        var vm = this;
        vm.createModal = openCreateModal;

        activate();

        function activate() {
            vm.tab = 0;
            vm.dayOptions = false;
        }
        
        function openCreateModal(){
            // vm.eventToBeAdded.day = vm.dayOptions.day;
            $("#createEvent").modal();
        }
    }
})();
