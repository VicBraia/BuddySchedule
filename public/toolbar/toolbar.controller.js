(function() {
    'use strict';

    angular
        .module('buddy-schedule')
        .controller('ToolbarCtrl', ToolbarCtrl);

    ToolbarCtrl.$inject = ['$scope', '$state'];

    /* @ngInject */
    function ToolbarCtrl($scope, $state) {
        var vm = this;

        activate();

        function activate() {

        }
    }
})();
