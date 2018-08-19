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
          templateUrl: 'calendar/monthView.html',
          controller: 'MonthViewCtrl',
           controllerAs: 'vm'
        }
      },
      resolve: {
        resolvedEvents: function(EventFactory){
          return EventFactory.getAll();
          }
        }
      }

      var weekViewState = {
        name: 'app.weekView',
        url: '/calendar/weekView',
        views:{
         'content':{
           templateUrl: 'calendar/weekView.html',
           controller: 'WeekViewCtrl',
           controllerAs: 'vm'
         }
       },
      resolve: {
        resolvedEvents: function(EventFactory){
          return EventFactory.getAll();
          }
        }
      }

      var dayViewState = {
        name: 'app.dayView',
        url: '/calendar/dayView',
        views:{
         'content':{
           templateUrl: 'calendar/dayView.html',
           controller: 'DayViewCtrl',
           controllerAs: 'vm'
         }
       },
      resolve: {
        resolvedEvents: function(EventFactory){
          return EventFactory.getAll();
          }
        }
      }  
      
      var calendar2State = {
        name: 'app.calendar2',
        url: '/calendar2',
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
    $stateProvider.state(weekViewState);
    $stateProvider.state(dayViewState);
    $stateProvider.state(calendar2State);
    $stateProvider.state(createState);
    $stateProvider.state(eventDetailState);
    
    $urlRouterProvider.otherwise('/app/home');

  }

    function run($rootScope, $state){
      $rootScope.$state = $state;
    }

})();
