(function() {
  'use strict';

  angular
  .module('buddy-schedule')
  .config(config)
  .run(run);

  function config($urlRouterProvider, $stateProvider){
    var createState = {
          name: 'create',
          url: '/create',
          templateUrl: 'monthView/create.html',
          controller: 'MonthViewCtrl',
          controllerAs: 'vm'
      }

    var dayDetailState = {
          name: 'dayDetails',
          url: '/dayDetails',
          templateUrl: 'monthView/dayDetails.html',
          controller: 'MonthViewCtrl',
          controllerAs: 'vm'
      }

    $stateProvider.state(createState);
    $stateProvider.state(dayDetailState);    

    $urlRouterProvider.otherwise('/app/home');

  }

    function run($rootScope, $state){
      $rootScope.$state = $state;
    }

})();
