(function () {

    'use strict';

    angular
        .module('app', [
            'bulma',
            'hljs',

            'app.modals',
            'app.progress',
            'app.tabs',
            'app.toasts'
        ])
        .config(config)
        .run(run);

    config.$inject = [
        'hljsServiceProvider'

    ];

    /**
     * App config
     * @param hljsServiceProvider
     */
    function config(hljsServiceProvider) {
        hljsServiceProvider.setOptions({
            tabReplace: '    '
        });
    }

    run.$inject = ['bulma'];

    /**
     * App run
     * @param {Bulma} bulma
     */
    function run(bulma) {
        bulma.configure('toast', {
            position: 'rb'
        });
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
        .module('app.tabs', []);

})();
(function () {

    'use strict';

    angular
        .module('app.toasts', []);

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
        .controller('modalsController', modalsController);

    modalsController.$inject = [
        'bulma'
    ];

    /**
     * @param {Bulma} bulma
     */
    function modalsController(bulma) {
        var vm             = this;
        vm.openSelfClosing = openSelfClosing;
        vm.openNormal      = openNormal;

        /**
         * openSelfClosing
         */
        function openSelfClosing() {
            bulma
                .modal({
                    templateUrl:  'js/app/modals/selfClose.html',
                    controller:   'selfCloseModalController',
                    controllerAs: 'vm'
                })
                .then(function (modal) {
                    modal.show();
                })
                .catch(console.error);
        }

        /**
         * openNormal
         */
        function openNormal() {
            bulma
                .modal({
                    templateUrl:  'js/app/modals/normal.html',
                    controller:   'normalModalController',
                    controllerAs: 'vm'
                })
                .then(function (modal) {
                    modal.show();
                })
                .catch(console.error);
        }
    }

})();
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
(function () {

    'use strict';

    angular
        .module('app.modals')
        .controller('selfCloseModalController', selfCloseModalController);

    selfCloseModalController.$inject = [
        '$timeout',
        'bulmaModal'
    ];

    /**
     * @param $timeout
     * @param {BulmaModal} bulmaModal
     */
    function selfCloseModalController($timeout,
                                      bulmaModal) {
        var vm   = this;
        vm.close = close;

        activate();

        /**
         * activate
         */
        function activate() {
            $timeout(function () {
                bulmaModal.destroy();
            }, 5000);
        }

        /**
         * close the modal (destroy)
         */
        function close() {
            bulmaModal.destroy();
        }
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
(function () {

    'use strict';

    angular
        .module('app.toasts')
        .component('exampleToasts', {
            templateUrl: 'js/app/toasts/toasts.html',
            controller:  'toastsController as vm'
        });

})();
(function () {

    'use strict';

    angular
        .module('app.toasts')
        .controller('toastsController', toastsController);

    toastsController.$inject = ['bulma'];

    /**
     * @param {Bulma} bulma
     */
    function toastsController(bulma) {
        var vm       = this;
        vm.message   = 'Sample <b>message</b>. It supports <b>HTML</b>.';
        vm.showToast = showToast;

        function showToast(type, timeout) {
            bulma
                .toast({
                    type:     type,
                    contents: vm.message,
                    timeout:  timeout
                })
                .then(function (toast) {
                    console.log(toast);
                });
        }
    }

})();