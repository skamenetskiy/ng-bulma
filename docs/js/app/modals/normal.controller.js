(function () {

    'use strict';

    angular
        .module('app.modals')
        .controller('normalModalController', normalModalController);

    normalModalController.$inject = ['bulmaModal'];

    /**
     * @param {BulmaModal} bulmaModal
     */
    function normalModalController(bulmaModal) {
        var vm   = this;
        vm.close = close;
        vm.hello = 'Hello World!';

        /**
         * close
         */
        function close() {
            bulmaModal.destroy();
        }
    }

})();