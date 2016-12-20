(function () {

    'use strict';

    angular
        .module('bulma.toast')
        .component('bulmaToast', {
            bindings:    {
                toast:  '=',
                inline: '=?'
            },
            templateUrl: 'src/toast/toast.html',
            controller:  'bulmaToastController as vm'
        })
        .component('bulmaToasts', {
            transclude: true,
            template:   '<ng-transclude></ng-transclude>',
            controller: 'bulmaToastsController as vm'
        });

})();