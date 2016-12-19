(function () {

    'use strict';

    angular
        .module('bulma.tabs.tab')
        .controller('bulmaTabsTabController', bulmaTabsTabController);

    bulmaTabsTabController.$inject = [];

    /**
     * bulmaTabsTabController
     */
    function bulmaTabsTabController() {
        var vm     = this;
        vm.$onInit = onInit;

        /**
         * Initialize
         */
        function onInit() {
            vm.tabsCtrl.add(this);
        }
    }

})();