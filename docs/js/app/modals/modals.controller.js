(function () {

    'use strict';

    angular
        .module('app.modals')
        .controller('modalsController', modalsController);

    modalsController.$inject = [
        'bulma'
    ];

    /**
     * @param {Bulma} bulma
     */
    function modalsController(bulma) {
        var vm             = this;
        vm.openSelfClosing = openSelfClosing;
        vm.openNormal      = openNormal;

        /**
         * openSelfClosing
         */
        function openSelfClosing() {
            bulma
                .modal({
                    templateUrl:  'js/app/modals/selfClose.html',
                    controller:   'selfCloseModalController',
                    controllerAs: 'vm'
                })
                .then(function (modal) {
                    modal.show();
                })
                .catch(console.error);
        }

        /**
         * openNormal
         */
        function openNormal() {
            bulma
                .modal({
                    templateUrl:  'js/app/modals/normal.html',
                    controller:   'normalModalController',
                    controllerAs: 'vm'
                })
                .then(function (modal) {
                    modal.show();
                })
                .catch(console.error);
        }
    }

})();