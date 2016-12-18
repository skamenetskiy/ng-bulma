(function () {

    'use strict';

    angular
        .module('bulma.progress')
        .controller('bulmaProgressController', bulmaProgressController);

    bulmaProgressController.$inject = [];

    function bulmaProgressController() {
        var vm     = this;
        vm.classes = {
            // Colors
            'is-primary': vm.color == 'primary',
            'is-info':    vm.color == 'info',
            'is-success': vm.color == 'success',
            'is-warning': vm.color == 'warning',
            'is-danger':  vm.color == 'danger',

            // Sizes
            'is-small':  vm.size == 'small',
            'is-medium': vm.size == 'medium',
            'is-large':  vm.size == 'large'
        };
    }

})();