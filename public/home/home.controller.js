(function () {
    'use strict';

    angular
        .module('buddy-schedule')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$state'];

    /* @ngInject */
    function HomeCtrl($scope, $state) {
        var vm = this;
        vm.dayOptions = false;

        activate();

        function activate() {
            vm.tab = 0;
        }
    }
})();
