(function() {
    'use strict';

    angular
        .module('buddy-schedule')
        .controller('MonthViewCtrl', MonthViewCtrl);


        MonthViewCtrl.$inject = ['$scope', '$state', 'EventFactory'];

    /* @ngInject */
    function MonthViewCtrl($scope, $state, EventFactory) {
        var vm = this;
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

        vm.currentView = 0;
        vm.currentViewList = ['Month','Week', 'Day'];

        vm.monthList = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        vm.weekDayList = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
        vm.abbrevMonthList = ['Jan', 'Fev', 'Mar', 'Abri', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        vm.abbrevWeekDayList = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

        vm.shownDay = vm.currentDay;
        vm.shownYear = vm.currentYear;
        vm.shownWeekDay = vm.weekDayList[vm.currentWeekDay];  
        vm.shownMonth = vm.currentMonth - 1; 
        vm.monthWeeks = [];    
        
        vm.changeMonth = changeMonth;

        activate();
        
        function activate() {
            vm.monthWeeks = initializeMonth(vm.shownMonth);
        }

        function initializeMonth(month){
            var daysToBeShown = [];
            var date;
            var day = new Date (vm.currentYear, month, 1);
            var weekDay = day.getDay();

            while(weekDay != 0){ //get dates from previous month that appear in the first week of the current month
                date = new Date (vm.currentYear, month, -weekDay+1);
                date = date.getDate();
                daysToBeShown.push(date);
                weekDay--;
            }

            while(day.getMonth() == month){ //get current month's dates
                date =  day.getDate();
                day.setDate(day.getDate() + 1);
                daysToBeShown.push(date);
            }

            for(var i = day.getDay(); i<=6; i++){
                date =  day.getDate();
                day.setDate(day.getDate() + 1);
                daysToBeShown.push(date);
            }

            var calendarWeeks = [];
            for(var i = 0; i < daysToBeShown.length; i+= 7){
                var tmp = daysToBeShown.slice(i, i+7);
                calendarWeeks.push(tmp);
            }
            return calendarWeeks;
        }

        function changeMonth(value){
            switch(value){
                case(-1):
                    vm.shownMonth--;
                    if(vm.shownMonth < 0){
                        vm.shownYear--;
                        vm.shownMonth = 11;
                    }
                    vm.monthWeeks = initializeMonth(vm.shownMonth); 
                break;
                case(1):
                    vm.shownMonth++;
                    if(vm.shownMonth > 11){
                        vm.shownYear++;
                        vm.shownMonth = 0;
                    }
                    vm.monthWeeks = initializeMonth(vm.shownMonth); 
                break;
            }
        }

        function changeView(option){
            switch(option){
                case 1:
                    //Month
                break;
                case 2:
                    //Week
                break;
                case 3:
                    //Day
                break;
            }
        }
    }
})();

        