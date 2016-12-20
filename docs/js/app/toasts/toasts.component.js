(function () {

    'use strict';

    angular
        .module('app.toasts')
        .component('exampleToasts', {
            templateUrl: 'js/app/toasts/toasts.html',
            controller:  'toastsController as vm'
        });

})();