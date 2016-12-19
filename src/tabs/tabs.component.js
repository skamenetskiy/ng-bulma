(function () {

    'use strict';

    angular
        .module('bulma.tabs')
        .component('bulmaTabs', {
            bindings:    {
                class: '@?'
            },
            templateUrl: 'src/tabs/tabs.html',
            controller:  'bulmaTabsController as vm',
            transclude:  true
        });

})();