(function () {

    'use strict';

    angular
        .module('app.modals')
        .component('exampleModals', {
            templateUrl: 'js/app/modals/modals.html',
            controller:  'modalsController as vm'
        });

})();