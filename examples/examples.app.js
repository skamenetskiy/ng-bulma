(function () {

    'use strict';

    angular
        .module('app', ['bulma'])
        .config(config)
        .run(run)
        .controller('modalsController', modalsController)
        .controller('sampleController', sampleController);

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
                    controller:   'sampleController',
                    controllerAs: 'vm'
                })
                .then(function (modal) {
                    modal.show();
                    console.log(modal);
                });
        };

    }

    sampleController.$inject = ['$scope', '$timeout', 'bulmaModal'];

    function sampleController($scope, $timeout, bulmaModal) {
        var vm   = this;
        vm.hello = 123;

        $scope.$on('$destroy', function () {
            console.log('destroy sampleController');
        });

        $timeout(function () {
            vm.hello = 321;
            $timeout(function () {
                bulmaModal.destroy();
            }, 3000);
        }, 3000);
    }

})();