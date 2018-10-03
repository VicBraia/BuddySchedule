(function() {
    'use strict';

    angular
        .module('buddy-schedule')
        .controller('WeekViewCtrl', WeekViewCtrl);


        WeekViewCtrl.$inject = ['$scope', '$state', 'EventFactory'];

    /* @ngInject */
    function WeekViewCtrl($scope, $state, EventFactory) {
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

        vm.changeWeek = changeWeek;
        vm.checkHour = checkHour;

        activate();
        
        function activate() {
            vm.week = getWeek(vm.today);
            vm.hours = initializeHours();
            //console.log(vm.week);
        }

        function checkHour(hour){
            $("#createEvent").modal();
        }

        function initializeHours(){
            var hours = [];
            hours.push(vm.today.startOf('day').format('HH:mm'));

            for(var i = 1; i <= 23; i++){
                hours.push(vm.today.startOf('day').add(i, 'hours').format('HH:mm'));
            }
            return hours;
        }

        function getWeek(date){
            var week = [];
            week.push(date.startOf('week').format('DD'));

            for(var i = 1; i <= 6; i++){
                week.push(date.startOf('week').add(i, 'days').format('DD'));
            }

            return week;
        }

        function changeWeek(value){
            return vm.week = getWeek(vm.today.add(value*7, 'days'));
        }
    }
})();