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
      templateUrl: 'home/home.html',
      abstract: true,
      controller: 'HomeCtrl',
      controllerAs: 'vm'
    }
    // var homeState = {
    //   name: 'app.home',
    //   url: '/home',
    //   abstract: true,
    //   templateUrl: 'home/home.html',
    //   controller: 'HomeCtrl',
    //   controllerAs: 'vm',
    //   resolve: {
    //     resolvedEvents: function(EventFactory){
    //       return EventFactory.getAll();
    //       }
    //     }
    //   }

      var calendarViewState = {
        name: 'app.calendarView',
        url: '/view',
        views: {
          monthView: {
            templateUrl: 'monthView/view.html',
            controller: 'MonthViewCtrl',
            controllerAs: 'vm'
          },
          weekView:{
            templateUrl: 'weekView/view.html',
            controller: 'WeekViewCtrl',
            controllerAs: 'vm'
          },
          dayView:{
            templateUrl: 'dayView/view.html',
            controller: 'DayViewCtrl',
            controllerAs: 'vm'
          }
      }
    }
  
    $stateProvider.state(appState);
    // $stateProvider.state(homeState);
    $stateProvider.state(calendarViewState);   
    
    $urlRouterProvider.otherwise('/app/view');
  }

    function run($rootScope, $state){
      $rootScope.$state = $state;
    }

})();
