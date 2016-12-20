(function () {

    'use strict';

    angular
        .module('bulma.modal')
        .component('bulmaModal', {
            bindings:    {
                modal: '='
            },
            templateUrl: 'src/modal/modal.html',
            controller:  'bulmaModalController as vm'
        })
        .component('bulmaModals', {
            transclude: true,
            template:   '<ng-transclude></ng-transclude>'
        });

})();