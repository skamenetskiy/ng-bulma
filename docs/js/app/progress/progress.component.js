(function () {

    'use strict';

    angular
        .module('app.progress')
        .component('exampleProgress', {
            templateUrl: 'js/app/progress/progress.html',
            controller:  'progressController as vm'
        });

})();