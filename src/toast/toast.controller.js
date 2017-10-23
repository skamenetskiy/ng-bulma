(function () {

    'use strict';

    angular
        .module('bulma.toast')
        .controller('bulmaToastController', bulmaToastController)
        .controller('bulmaToastsController', bulmaToastsController);

    bulmaToastController.$inject = [
        '$scope',
        '$sce',
        '$timeout'
    ];

    /**
     * bulmaToasterController
     * @param $scope
     * @param $sce
     * @param $timeout
     */
    function bulmaToastController($scope,
                                  $sce,
                                  $timeout) {
        var vm      = this;
        var style   = vm.toast.getOption('type');
        var timeout = vm.toast.getOption('timeout');
        vm.close    = close;
        vm.$onInit  = $onInit;

        /**
         * Activate the controller
         */
        function $onInit() {
            vm.inline    = vm.inline !== false;
            vm.showClose = vm.toast.getOption('closeButton');
            vm.contents  = $sce.trustAsHtml(vm.toast.getOption('contents'));
            vm.style     = style !== null
                ? 'is-' + style
                : '';

            if (typeof(timeout) === 'number' && timeout > 0) {
                var tm = $timeout(function () {
                    vm.toast.destroy();
                }, timeout);
                $scope.$on('$destroy', function () {
                    $timeout.cancel(tm);
                });
            }
        }

        /**
         * Close (destroy) the toast
         */
        function close() {
            vm.toast.destroy();
        }
    }

    bulmaToastsController.$inject = [
        '$element',
        'bulma'
    ];

    function bulmaToastsController($element, bulma) {
        $element
            .removeClass('p-lt p-rt p-lb p-rb')
            .addClass('p-' + bulma.configuration.toast.position);
    }

})();