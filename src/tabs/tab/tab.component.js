(function () {

    'use strict';

    angular
        .module('bulma.tabs.tab')
        .component('bulmaTab', {
            templateUrl: 'src/tabs/tab/tab.html',
            controller:  'bulmaTabsTabController as vm',
            transclude:  true,
            bindings:    {
                title: '@',
                icon:  '@?'
            },
            require:     {
                tabsCtrl: '^bulmaTabs'
            }
        });

})();