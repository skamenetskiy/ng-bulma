(function () {

    'use strict';

    angular
        .module('app.tabs')
        .component('exampleTabs', {
            templateUrl: 'js/app/tabs/tabs.html',
            controller:  'tabsController as vm',
            transclude: true
        });

})();