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
        vm.eventToBeAdded = new Object();
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
           eventClick: function(date, jsEvent, view){
             showEvent(date);
           },
           eventDrop: $scope.alertOnDrop,
           eventResize: $scope.alertOnResize,
           eventRender:  function() {
             $('#myCalendar1').fullCalendar('renderEvent', {
               resolvedEvents
             });
           },
           dayClick: function (date, jsEvent, view) {
              addEvent(date);
            }
          }
        }

       $scope.uiConfig.calendar.dayNames = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
       $scope.uiConfig.calendar.dayNamesShort = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
       $scope.uiConfig.calendar.monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
       $scope.uiConfig.calendar.monthNamesShort = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dec"];

       $scope.eventSources = [resolvedEvents];

       /* Change View */
       $scope.renderCalender = function(calendar) {
         if(uiCalendarConfig.calendars[calendar]){
           uiCalendarConfig.calendars[calendar].fullCalendar('render');
         }
       };
        /* Render Tooltip */
       $scope.eventRender = function(event, element, view ) {
           element.attr({'tooltip': event.title,
                        'tooltip-append-to-body': true});
           $compile(element)($scope);
       };

       function showEvent(date) {
         console.log(date);
         vm.eventToBeShown = {};
         vm.eventToBeShown.title = date.title;
         vm.eventToBeShown.date = date.start.format('DD/MM/YYYY');
         vm.eventToBeShown.startTime = date.start.utc().format('HH:mm');
         if(vm.eventToBeShown.startTime == "00:00"){
           vm.event.allDay = true;
           document.getElementById("checkAllDay2").checked= true;
           document.getElementById("time2").style.display= "none";
           document.getElementById("timeLabel2").style.display= "none";
         }
         else {
           vm.eventToBeShown.endTime = date.end.utc().format('HH:mm');
           vm.eventToBeAdded.allDay = false;
           document.getElementById("timeBegin2").disabled= false;
           document.getElementById("timeEnd2").disabled= false;
         }
         $("#eventDetails").modal();

       }

       function addEvent (date){
         vm.event.startTime = date.utc().format('HH:mm');
         vm.event.dateToBeShown = date.format('DD/MM/YYYY');
         vm.event.date = date.format('YYYY-MM-DD');
         document.getElementById("checkAllDay").checked= false;
         if(vm.event.startTime == "00:00"){
           vm.event.allDay = true;
           document.getElementById("checkAllDay").checked= true;
           document.getElementById("timeBegin").disabled= true;
           document.getElementById("timeEnd").disabled= true;
         }
         else {
           vm.event.end = date.add(1, "hours");
           vm.eventToBeAdded.allDay = false;
           document.getElementById("timeBegin").disabled= false;
           document.getElementById("timeEnd").disabled= false;
         }
         vm.event.title = null;
         vm.event.place = null;
         $("#createEvent").modal();
       }

       function saveAddition(){
         vm.eventToBeAdded.title = vm.event.title;
         vm.eventToBeAdded.start = vm.event.date;
         vm.eventToBeAdded.editable = true;
         var a = EventFactory.add(vm.eventToBeAdded);
       }

       function eventDetails(date) {

         $("#createEvent").modal();
         alert("que");
        }



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

    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };




    /* event sources array*/


    activate();
    function activate() {
    }

  }
})();
