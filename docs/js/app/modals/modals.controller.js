(function () {

    'use strict';

    angular
        .module('app.modals')
        .controller('modalsController', modalsController)
        .controller('sampleModalsController', sampleModalsController);

    modalsController.$inject = [
        'bulma'
    ];

    /**
     * @param {Bulma} bulma
     */
    function modalsController(bulma) {
        var vm       = this;
        vm.openModal = openModal;

        function openModal() {
            bulma
                .modal({
                    templateUrl:  'modal1.html',
                    controller:   'sampleModalsController',
                    controllerAs: 'vm'
                })
                .then(function (modal) {
                    modal.show();
                    console.log(modal);
                });
        }

    }

    sampleModalsController.$inject = ['$scope', '$timeout', 'bulmaModal'];

    function sampleModalsController($scope, $timeout, bulmaModal) {
        var vm   = this;
        vm.hello = 123;

        $scope.$on('$destroy', function () {
            console.log('destroy sampleModalsController');
        });

        $timeout(function () {
            vm.hello = 321;
            $timeout(function () {
                bulmaModal.destroy();
            }, 3000);
        }, 3000);
    }

})();