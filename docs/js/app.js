(function () {

    'use strict';

    angular
        .module('app', ['bulma'])
        .config(config)
        .run(run)
        .controller('modalsController', modalsController)
        .controller('progressController', progressController)
        .controller('sampleModalsController', sampleModalsController);

    /**
     * App config
     */
    function config() {
    }

    /**
     * App run
     */
    function run() {
    }

    modalsController.$inject = [
        '$scope',
        'bulma'
    ];

    /**
     * @param $scope
     * @param {Bulma} bulma
     */
    function modalsController($scope,
                              bulma) {

        var modal = null;

        $scope.openModal = function () {
            modal = bulma
                .modal({
                    templateUrl:  'modal1.html',
                    controller:   'sampleModalsController',
                    controllerAs: 'vm'
                })
                .then(function (modal) {
                    modal.show();
                    console.log(modal);
                });
        };

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

    progressController.$inject = ['$timeout'];

    function progressController($timeout) {
        var vm   = this;
        vm.value = 30;
        $timeout(function () {
            vm.value = 70;
        }, 3000);
    }

})();