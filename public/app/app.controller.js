(function() {
    'use strict';

    angular
        .module('buddy-schedule')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$scope'];

    /* @ngInject */
    function AppCtrl($scope) {
        var vm = this;

        activate();

        function activate() {
        }
    }
})();
