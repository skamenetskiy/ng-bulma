(function () {

    'use strict';

    angular
        .module('app', [
            'bulma',
            'hljs',

            'app.modals',
            'app.progress',
            'app.tabs'
        ])
        .config(config)
        .run(run);

    config.$inject = ['hljsServiceProvider'];

    /**
     * App config
     */
    function config(hljsServiceProvider) {
        console.log(hljsServiceProvider);
        hljsServiceProvider.setOptions({
            tabReplace: '    '
        });
    }

    /**
     * App run
     */
    function run() {
    }

})();
(function () {

    'use strict';

    angular
        .module('app.modals', []);

})();
(function () {

    'use strict';

    angular
        .module('app.progress', []);

})();
(function () {

    'use strict';

    angular
        .module('app.tabs', [
            'bulma.tabs.tab'
        ]);

})();
(function () {

    'use strict';

    angular
        .module('app.modals')
        .component('exampleModals', {
            templateUrl: 'js/app/modals/modals.html',
            controller:  'modalsController as vm'
        });

})();
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
(function () {

    'use strict';

    angular
        .module('app.progress')
        .component('exampleProgress', {
            templateUrl: 'js/app/progress/progress.html',
            controller:  'progressController as vm'
        });

})();
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
(function () {

    'use strict';

    angular
        .module('app.tabs')
        .component('exampleTabs', {
            templateUrl: 'js/app/tabs/tabs.html',
            controller:  'tabsController as vm',
            transclude: true
        });

})();
(function () {

    'use strict';

    angular
        .module('app.tabs')
        .controller('tabsController', tabsController);

    tabsController.$inject = [];

    function tabsController() {
    }

})();