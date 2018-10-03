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
    var homeState = {
      name: 'app.home',
      url: '/home',
      views:{
       'content':{
          templateUrl: 'home/home.html',
          controller: 'HomeCtrl',
          controllerAs: 'vm' 
        }
      },
      resolve: {
        resolvedEvents: function(EventFactory){
          return EventFactory.getAll();
          }
        }
      }
  
    $stateProvider.state(appState);
    $stateProvider.state(homeState);
   
    
    $urlRouterProvider.otherwise('/app/calendar');
  }

    function run($rootScope, $state){
      $rootScope.$state = $state;
    }

})();
