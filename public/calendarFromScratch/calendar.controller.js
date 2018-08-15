(function() {
    'use strict';

    angular
        .module('buddy-schedule')
        .controller('CalendarFromScratchCtrl', CalendarFromScratchCtrl);


        CalendarFromScratchCtrl.$inject = ['$scope', '$state', 'EventFactory', 'resolvedEvents'];

    /* @ngInject */
    function CalendarFromScratchCtrl($scope, $state, EventFactory, resolvedEvents) {
        var vm = this;
        vm.today = moment(new Date());
        vm.currentMonth = vm.today.format('MM'); // get from monthList
        vm.currentDay = vm.today.format('DD');
        vm.currentWeekDay = vm.today.format('d'); // get from weekDayList
        vm.currentYear = vm.today.format('YYYY');
        vm.currentTime = vm.today.format('HH:mm');

        // vm.monthList = new Array;
        // vm.weekDayList = new Array;
        // vm.abbrevMonthList = new Array;
        // vm.abbrevMeekDayList = new Array;

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

        var offset = -1;

        vm.shownDay = vm.currentDay;
        vm.shownYear = vm.currentYear;
        vm.shownWeekDay = vm.weekDayList[vm.currentWeekDay];  
        vm.shownMonth = vm.currentMonth - 1;     
        
        vm.changeMonth = changeMonth;

        activate();
        
        function activate() {
        }

        function updateMonth(){
            vm.month = [];
            var date;
            var day = new Date (vm.currentYear, vm.shownMonth, 1);
            var weekDay = day.getDay();

            while(weekDay != 0){ //get dates from previous month that appear in the first week of the current month
                date = new Date (vm.currentYear, vm.shownMonth, -weekDay+1);
                date = date.getDate();
                vm.month.push(date);
                weekDay--;
            }

            while(day.getMonth() == vm.shownMonth){ //get current month's dates
                date =  day.getDate();
                day.setDate(day.getDate() + 1);
                vm.month.push(date);
            }

            for(var i = day.getDay(); i<=6; i++){
                date =  day.getDate();
                day.setDate(day.getDate() + 1);
                vm.month.push(date);
            }

            console.log(vm.shownMonth);
            console.log(vm.month);
        }

        function changeMonth(value){
            switch(value){
                case(-1):
                    vm.shownMonth--;
                    if(vm.shownMonth < 0){
                        vm.shownYear--;
                        vm.shownMonth = 11;
                    }
                break;
                case(1):
                    vm.shownMonth++;
                    if(vm.shownMonth > 11){
                        vm.shownYear++;
                        vm.shownMonth = 0;
                    }
                break;
            }
            updateMonth();  
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

        