(function() {
  'use strict';

  angular
  .module('buddy-schedule')
  .config(config)
  .run(run);

  function config($urlRouterProvider, $stateProvider){
    var calendarState = {
          name: 'app.calendar',
          url: '/calendar',
          views:{
           'content':{
             templateUrl: 'calendar/calendar.html',
             controller: 'CalendarCtrl',
             controllerAs: 'vm'
           }
         },
      resolve: {
        resolvedEvents: function(EventFactory){
          return EventFactory.getAll();
          }
        }
      }
    var createState = {
          name: 'create',
          url: '/create',
          templateUrl: 'calendar/create.html',
          controller: 'CalendarCtrl',
          controllerAs: 'vm'
      }

    var eventDetailState = {
          name: 'eventDetail',
          url: '/eventDetail',
          templateUrl: 'calendar/eventDetail.html',
          controller: 'CalendarCtrl',
          controllerAs: 'vm'
      }


    $stateProvider.state(calendarState);
    $stateProvider.state(createState);
    $stateProvider.state(eventDetailState);

  }

    function run($rootScope, $state){
      $rootScope.$state = $state;
    }

})();
