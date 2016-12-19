(function () {

    'use strict';

    angular
        .module('bulma.tabs')
        .controller('bulmaTabsController', bulmaTabsController);

    bulmaTabsController.$inject = [];

    /**
     * bulmaTabsController
     */
    function bulmaTabsController() {
        var vm    = this;
        vm.tabs   = [];
        vm.class  = vm.class || '';
        vm.select = select;
        vm.add    = add;

        /**
         * Mark a tab as selected
         * @param tab
         */
        function select(tab) {
            angular.forEach(vm.tabs, function (tab) {
                tab.selected = false;
            });
            tab.selected = true;
        }

        /**
         * Add a tab
         * @param tab
         */
        function add(tab) {
            if (vm.tabs.length === 0) {
                select(tab);
            }
            vm.tabs.push(tab);
        }
    }

})();