(function() {
    'use strict';

    angular
        .module('buddy-schedule')
        .controller('DayViewCtrl', DayViewCtrl);


        DayViewCtrl.$inject = ['$scope', '$state', 'EventFactory'];

    /* @ngInject */
    function DayViewCtrl($scope, $state, EventFactory) {
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

        vm.changeDay = changeDay;
        vm.checkHour = checkHour;

        activate();
        
        function activate() {
            vm.date = getDate(0);
            initializeCharacteristics(vm.date);            
            vm.hours = initializeHours();
        }

        function checkHour(hour){
            $("#createEvent").modal();
        }

        function initializeCharacteristics(date){
            vm.shownMonth = vm.monthList[date.format('MM') - 1]; // get from monthList
            vm.shownDay = date.format('DD');
            vm.shownWeekDay = vm.weekDayList[date.format('d')]; // get from weekDayList
            vm.shownYear = date.format('YYYY');
            vm.shownTime = date.format('HH:mm');
        }

        function getDate(value){
            switch(value){
                case (0):
                    return moment(new Date());
                break;
                case(1):
                    return vm.date.add(value, 'day');
                break;
                case(-1):
                    return vm.date.add(value, 'day');
                break;
            }
        }

        function changeDay(value){
            vm.date = getDate(value);
            initializeCharacteristics(vm.date);            
        }

        function initializeHours(){
            var hours = [];
            hours.push(vm.today.startOf('day').format('HH:mm'));

            for(var i = 1; i <= 23; i++){
                hours.push(vm.today.startOf('day').add(i, 'hours').format('HH:mm'));
            }
            return hours;
        }
    }
})();