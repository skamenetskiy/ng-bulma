(function () {

    'use strict';

    angular
        .module('app.progress')
        .controller('progressController', progressController);

    progressController.$inject = [];

    /**
     * progressController
     */
    function progressController() {
        var vm      = this;
        vm.value    = 30;
        vm.color    = 'primary';
        vm.setValue = setValue;
        vm.setColor = setColor;

        /**
         * @param value
         */
        function setValue(value) {
            vm.value = value;
        }

        /**
         * @param color
         */
        function setColor(color) {
            vm.color = color;
        }
    }

})();