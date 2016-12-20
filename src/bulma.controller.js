(function () {

    'use strict';

    angular
        .module('bulma')
        .controller('bulmaController', bulmaController);

    bulmaController.$inject = ['bulma'];

    /**
     * @param {Bulma} bulma
     */
    function bulmaController(bulma) {
        var vm    = this;
        vm.modals = bulma.modals;
        vm.toasts = bulma.toasts;
    }

})();