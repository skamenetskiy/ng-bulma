(function () {

    'use strict';

    angular
        .module('bulma.modal')
        .controller('bulmaModalController', bulmaModalController);

    bulmaModalController.$inject = [
        '$scope',
        '$controller',
        '$compile',
        '$element'
    ];

    /**
     * bulmaModalController
     * @param $scope
     * @param $controller
     * @param $compile
     * @param $element
     */
    function bulmaModalController($scope,
                                  $controller,
                                  $compile,
                                  $element) {
        var vm         = this;
        var scope      = $scope.$new(true, $scope);
        var controller = $controller(
            vm.modal.getOption('controller'),
            {
                $scope:           scope,
                bulmaModal:       vm.modal,
                bindToController: true
            },
            true,
            vm.modal.getOption('controllerAs')
        );

        vm.classes = vm.modal.classes = angular.merge({
            'is-active': vm.modal.visible
        }, vm.modal.getOption('classes'));

        $element
            .children(0)
            .data('$ngControllerController', controller())
            .html(vm.modal.getOption('template'));

        $compile($element.contents())(scope);
    }

})();