(function () {

    'use strict';

    angular
        .module('app.modals')
        .controller('selfCloseModalController', selfCloseModalController);

    selfCloseModalController.$inject = [
        '$timeout',
        'bulmaModal'
    ];

    /**
     * @param $timeout
     * @param {BulmaModal} bulmaModal
     */
    function selfCloseModalController($timeout,
                                      bulmaModal) {
        var vm   = this;
        vm.close = close;

        activate();

        /**
         * activate
         */
        function activate() {
            $timeout(function () {
                bulmaModal.destroy();
            }, 5000);
        }

        /**
         * close the modal (destroy)
         */
        function close() {
            bulmaModal.destroy();
        }
    }

})();