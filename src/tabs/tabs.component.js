(function () {

    'use strict';

    angular
        .module('bulma.tabs')
        .component('bulmaTabs', {
            templateUrl: 'src/tabs/tabs.html',
            controller:  'bulmaTabsController as vm',
            transclude:  true
        });

})();