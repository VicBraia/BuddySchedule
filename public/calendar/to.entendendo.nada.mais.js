(function() {
    'use strict';

    angular
        .module('buddy-schedule')
        .controller('CalendarCtrl', CalendarCtrl);


    CalendarCtrl.$inject = ['$scope', '$state', 'EventFactory', 'resolvedEvents', 'uiCalendarConfig'];

    /* @ngInject */
    function CalendarCtrl($scope, $state, EventFactory, resolvedEvents, uiCalendarConfig) {
        var vm = this;
        vm.event = new Object();
        vm.date = new Date();
        vm.d = vm.date.getDate();
        vm.m = vm.date.getMonth();
        vm.y = vm.date.getFullYear();

        vm.saveAddition = saveAddition;

        /* event source that pulls from google.com */
        $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            currentTimezone: "America/Sao_Paulo"
        }

        $scope.event = resolvedEvents;


        function addEvent (date){
          vm.event.date = date.format('DD/MM/YYYY');
          vm.event.start = date.utc().format('HH:mm');
          document.getElementById("checkAllDay").checked= false;
          if(vm.event.start == "00:00"){
            vm.event.start = vm.event.end = null;
            document.getElementById("checkAllDay").checked= true;
            document.getElementById("timeBegin").disabled= true;
            document.getElementById("timeEnd").disabled= true;
          }
          else {
            vm.event.end = date.add(1, "hours").utc().format("HH:mm");
            document.getElementById("timeBegin").disabled= false;
            document.getElementById("timeEnd").disabled= false;
          }
          vm.event.title = null;
          vm.event.place = null;
          $("#createEvent").modal();
        }

        $scope.uiConfig = {
         calendar:{
           height: 500,
           editable: true,
           lang: 'pt',
           header:{
             left: 'month basicWeek basicDay agendaWeek agendaDay',
             center: 'title',
             right: 'today prev,next'
           },
           eventClick: $scope.alertEventOnClick,
           eventDrop: $scope.alertOnDrop,
           eventResize: $scope.alertOnResize,
           eventRender:  function(event, element, view ) {
               element.attr({'tooltip': event.title,
                            'tooltip-append-to-body': true});
               $compile(element)($scope);
           },
           dayClick: function (date, jsEvent, view ) {
              addEvent(date);
           }
       }
     }

       $scope.uiConfig.calendar.dayNames = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
       $scope.uiConfig.calendar.dayNamesShort = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
       $scope.uiConfig.calendar.monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
       $scope.uiConfig.calendar.monthNamesShort = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dec"];


        /* event source that contains custom events on the scope */
    /* event source that calls a function on every view switch */
    // $scope.eventsF = function (start, end, timezone, callback) {
    //   var s = new Date(start).getTime() / 1000;
    //   var e = new Date(end).getTime() / 1000;
    //   var m = new Date(start).getMonth();
    //   var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
    //   callback(events);
    // };
    //
    // $scope.calEventsExt = {
    //    color: '#f00',
    //    textColor: 'yellow',
    //    events: [
    //       {type:'party',title: 'Lunch',start: new Date(vm.y, vm.m, vm.d, 12, 0),end: new Date(vm.y, vm.m, vm.d, 14, 0),allDay: false},
    //       {type:'party',title: 'Lunch 2',start: new Date(vm.y, vm.m, vm.d, 12, 0),end: new Date(vm.y, vm.m, vm.d, 14, 0),allDay: false},
    //       {type:'party',title: 'Click for Google',start: new Date(vm.y, vm.m, 28),end: new Date(vm.y, vm.m, 29),url: 'http://google.com/'}
    //     ]
    // };
    /* alert on eventClick */
    $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');
    };
    /* alert on Drop */
     $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };
    /* add custom event*/
    // $scope.addEvent = function() {
    //   $scope.events.push({
    //     title: 'Open Sesame',
    //     start: new Date(y, m, 28),
    //     end: new Date(y, m, 29),
    //     className: ['openSesame']
    //   });
    // };
    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
      if(uiCalendarConfig.calendars[calendar]){
        uiCalendarConfig.calendars[calendar].fullCalendar('render');
      }
    };
     /* Render Tooltip */
    // $scope.eventRender = function(event, element, view ) {
    //     element.attr({'tooltip': event.title,
    //                  'tooltip-append-to-body': true});
    //     $compile(element)($scope);
    // };

    function saveAddition(){
      console.log(vm.event);
      EventFactory.add(vm.event);
    }
    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];


    activate();
    function activate() {
    }

  }
})();
