(function () {
    'use strict';

    angular
        .module('buddy-schedule')
        .controller('MonthViewCtrl', MonthViewCtrl);


    MonthViewCtrl.$inject = ['$scope', '$state', 'CalendarFactory', '$stateParams'];

    /* @ngInject */
    function MonthViewCtrl($scope, $state, CalendarFactory, $stateParams) {
        var vm = this;

        // initialize view
        vm.today = moment(new Date());
        vm.currentMonth = vm.today.format('MM'); // get from monthList
        vm.currentDay = vm.today.format('DD');
        vm.currentWeekDay = vm.today.format('d'); // get from weekDayList
        vm.currentYear = vm.today.format('YYYY');
        vm.currentTime = vm.today.format('HH:mm');
        vm.shownDay = {};
        vm.shownMonth = {};
        vm.shownYear = {};
        vm.shownWeekDay = {};
        vm.eventsToBeShown = [];
        vm.monthList = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        vm.weekDayList = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
        vm.shownDay = vm.currentDay;
        vm.shownYear = vm.currentYear;
        vm.shownWeekDay = vm.weekDayList[vm.currentWeekDay];
        vm.shownMonth = vm.currentMonth - 1;
        vm.monthWeeks = [];
        vm.weekList = {};

        // functions
        vm.changeMonth = changeMonth;
        vm.checkDate = checkDate;
        vm.getEventDetails = getEventDetails;
        vm.selectDay = selectDay;
        vm.createModal = createModal;
        vm.eventCount = eventCount;
        vm.saveAddition = saveAddition;

        // modal
        vm.eventToBeAdded = {};

        activate();

        function activate() {
            vm.dayOptions = false;
            vm.monthWeeks = initializeMonth(vm.shownMonth);
            vm.weekList = vm.weekDayList;
            vm.eventList = CalendarFactory.getAllSorted().$loaded(function (data) {
                vm.eventList = data;
                console.log(data);

                return data;
            });
        }

        function initializeMonth(month) {
            var daysToBeShown = [];
            var date = {};
            var aux;
            var day = new Date(vm.currentYear, month, 1);
            var weekDay = day.getDay();

            while (weekDay != 0) { //get dates from previous month that appear in the first week of the current month
                aux = new Date(vm.currentYear, month, -weekDay + 1);
                date = {};
                date.day = aux.getDate();
                date.month = -1;
                date.eventCount = 0;
                daysToBeShown.push(date);
                weekDay--;
            }


            while (day.getMonth() == month) { //get current month's dates
                date = {};
                date.day = day.getDate();
                date.month = 0;
                date.eventCount = 0;
                day.setDate(day.getDate() + 1);
                daysToBeShown.push(date);
            }

            for (var i = day.getDay(); i <= 6; i++) {//get dates from next month which appear in the last week of the current month
                date = {};
                date.day = day.getDate();
                date.month = 1;
                date.eventCount = 0;
                day.setDate(day.getDate() + 1);
                daysToBeShown.push(date);
            }

            var calendarWeeks = [];
            for (var i = 0; i < daysToBeShown.length; i += 7) { //separate weeks
                var tmp = daysToBeShown.slice(i, i + 7);
                calendarWeeks.push(tmp);
            }
            console.log(calendarWeeks);

            return calendarWeeks;
        }

        function changeMonth(value) {
            switch (value) {
                case (-1):
                    vm.shownMonth--;
                    if (vm.shownMonth < 0) {
                        vm.shownYear--;
                        vm.shownMonth = 11;
                    }
                    vm.monthWeeks = initializeMonth(vm.shownMonth);
                    break;
                case (1):
                    vm.shownMonth++;
                    if (vm.shownMonth > 11) {
                        vm.shownYear++;
                        vm.shownMonth = 0;
                    }
                    vm.monthWeeks = initializeMonth(vm.shownMonth);
                    break;
            }
        }

        function checkDate(date, eventDate) {
            if(date.day<10){
                var day = '0' + date.day;
            }
            else{
               var day = date.day;
            }
            var month = vm.shownMonth + 1 + date.month;
            month = month.toString();
            
            if(month<10){
                month = '0' + month;
            }

            var dateToCompare1 = day + '/' + month + '/' + vm.shownYear;
            var dateToCompare2 = moment (eventDate, 'DD/MM/YYYY').format('DD/MM/YYYY');
            
            if(dateToCompare1 == dateToCompare2){    
                return true;
            }
            return false;
        }

        function getEventDetails(eventId) {
            vm.eventDetailed = CalendarFactory.getById(eventId).$loaded();
            return vm.eventDetailed;
        }

        function selectDay(date) {
            vm.dayOptions = true;
            if(date.day<10){
                var day = '0' + date.day;
            }
            else{
               var day = date.day;
            }
            var month = vm.shownMonth + 1 + date.month;
            month = month.toString();
            
            if(month<10){
                month = '0' + month;
            }

            vm.eventToBeAdded.date = day + '/' + month + '/' + vm.shownYear;
        }

        function eventCount(date1, date) {
           
            console.log(date)
            
                        
            return 0;

        }

        function createModal() {
            $('#createEvent').modal();
        }

        function saveAddition() {

            if (vm.eventToBeAdded.allDay == true) {
                vm.eventToBeAdded.startTime = moment('0000', 'HH:mm').format('HH:mm');
                vm.eventToBeAdded.endTime = moment('2359', 'HH:mm').format('HH:mm');
            }
            else {
                vm.eventToBeAdded.startTime = moment(vm.eventToBeAdded.startTime, 'HH:mm').format('HH:mm');
                vm.eventToBeAdded.endTime = moment(vm.eventToBeAdded.endTime, 'HH:mm').format('HH:mm');
            }

            vm.eventToBeAdded.date = moment(vm.eventToBeAdded.date + vm.eventToBeAdded.startTime, 'DD/MM/YYYY HH:mm').format('DD/MM/YYYY HH:mm');

            CalendarFactory.addEvent(vm.eventToBeAdded);
            vm.eventToBeAdded = null;
            vm.dayOptions = false;
        }
    }
})();

