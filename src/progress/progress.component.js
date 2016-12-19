(function () {

    'use strict';

    angular
        .module('bulma.progress')
        .component('bulmaProgress', {
            bindings:    {
                value: '=',
                max:   '=',
                size:  '=',
                color: '='
            },
            templateUrl: 'src/progress/progress.html',
            controller:  'bulmaProgressController as vm'
        });

})();