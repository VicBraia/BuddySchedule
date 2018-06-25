(function() {
  'use strict';

  angular
  .module('buddy-schedule')
  .config(config)
  .run(run);

  function config($urlRouterProvider, $stateProvider){
    var appState = {
          name: 'app',
          url: '/app',
          templateUrl: 'toolbar/toolbar.html',
          abstract: true,
          controller: 'ToolbarCtrl',
          controllerAs: 'vm'
    }
    // var createState = {
    //       name: 'create',
    //       url: '/create',
    //       templateUrl: 'entity/create.html',
    //       controller: 'TemplateCtrl',
    //       controllerAs: 'vm'
    //   }
    //
    // var updateState = {
    //       name: 'update',
    //       url: '/update',
    //       templateUrl: 'entity/update.html',
    //       controller: 'TemplateCtrl',
    //       controllerAs: 'vm'
    //   }


    $stateProvider.state(appState);
    // $stateProvider.state(createState);
    // $stateProvider.state(updateState);

    $urlRouterProvider.otherwise('/app/calendar');
  }

    function run($rootScope, $state){
      $rootScope.$state = $state;
    }

})();
