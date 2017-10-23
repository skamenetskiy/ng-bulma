(function(angular){"use strict";
// Source: src/bulma.module.js
(function () {

angular
        .module('bulma', [
            'bulma.modal',
            'bulma.progress',
            'bulma.tabs',
            'bulma.toast'
        ]);

})();
// Source: src/modal/modal.module.js
(function () {

angular
        .module('bulma.modal', []);

})();
// Source: src/progress/progress.module.js
(function () {

angular
        .module('bulma.progress', []);

})();
// Source: src/tabs/tab/tab.module.js
(function () {

angular
        .module('bulma.tabs.tab', []);

})();
// Source: src/tabs/tabs.module.js
(function () {

angular
        .module('bulma.tabs', [
            'bulma.tabs.tab'
        ]);

})();
// Source: src/toast/toast.module.js
(function () {

angular
        .module('bulma.toast', []);

})();
// Source: src/bulma.component.js
(function () {

angular
        .module('bulma')
        .component('bulma', {
            templateUrl: 'src/bulma.html',
            controller:  'bulmaController as vm'
        });

})();
// Source: src/bulma.controller.js
(function () {

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
// Source: src/bulma.service.js
(function () {

angular
        .module('bulma')
        .service('bulma', service);

    service.$inject = [
        '$q',
        '$templateRequest',
        'BulmaModal',
        'BulmaModalCollection',
        'BulmaToast',
        'BulmaToastCollection'
    ];

    /**
     * @type {Object}
     */
    var configuration = {
        toast: {
            position: 'bl'
        }
    };

    /**
     * Service container
     * @param $q
     * @param $templateRequest
     * @param BulmaModal
     * @param BulmaModalCollection
     * @param BulmaToast
     * @param BulmaToastCollection
     * @returns {Bulma}
     */
    function service($q,
                     $templateRequest,
                     BulmaModal,
                     BulmaModalCollection,
                     BulmaToast,
                     BulmaToastCollection) {

        Bulma.prototype.modal     = modal;
        Bulma.prototype.toast     = toast;
        Bulma.prototype.configure = configure;

        return new Bulma();

        /**
         * Main bulma object
         * @constructor
         */
        function Bulma() {
            this.modals        = new BulmaModalCollection();
            this.toasts        = new BulmaToastCollection();
            this.configuration = configuration;
        }

        /**
         * Opens a bulma modal window
         * @param options
         * @returns {$q.promise}
         * @public
         */
        function modal(options) {
            var $this = this;
            return $q(function (resolve, reject) {
                var modal      = new BulmaModal(prepareModalOptions(options));
                options.modals = $this.modals;

                if (options.template) {
                    $this.modals.push(modal);
                    resolve(modal);
                } else {
                    $templateRequest(options.templateUrl)
                        .then(function (template) {
                            options.template = template;
                            $this.modals.push(modal);
                            resolve(modal);
                        })
                        .catch(reject);
                }
            });
        }

        /**
         * Creates new toast
         * @param options
         * @returns {$q.promise}
         * @public
         */
        function toast(options) {
            var $this = this;
            return $q(function (resolve) {
                var toast      = new BulmaToast(prepareToastOptions(options));
                options.toasts = $this.toasts;
                $this.toasts.push(toast);
                resolve(toast);
            });
        }

        /**
         * Prepare modal options
         * @param {Object} options
         * @returns {Object}
         * @private
         */
        function prepareModalOptions(options) {
            options              = options || {};
            options.template     = options.template || null;
            options.templateUrl  = options.templateUrl || null;
            options.controller   = options.controller || null;
            options.controllerAs = options.controllerAs || null;
            options.classes      = options.classes || {};

            if (options.template === null && options.templateUrl === null) {
                throw new Error('bulma.modal expects a template or templateUrl');
            }

            if (options.controller === null) {
                throw new Error('bulma.modal must have a controller');
            }

            return options;
        }

        /**
         * Prepare toast options
         * @param {Object} options
         * @returns {Object}
         * @private
         */
        function prepareToastOptions(options) {
            options             = options || {};
            options.closeButton = options.closeButton || null;
            options.type        = options.type || 'primary';
            options.contents    = options.contents || '';
            options.timeout     = options.timeout || null;

            if (options.closeButton === null) {
                options.closeButton = true;
            }

            if (options.timeout === null) {
                options.timeout = false;
            }

            return options;
        }

        /**
         * Configure bulma
         * @param {String} section
         * @param {Object} config
         */
        function configure(section, config) {
            angular.forEach(config, function (value, key) {
                configuration[section][key] = value;
            });
        }
    }

})();
// Source: src/modal/modal.component.js
(function () {

angular
        .module('bulma.modal')
        .component('bulmaModal', {
            bindings:    {
                modal: '='
            },
            templateUrl: 'src/modal/modal.html',
            controller:  'bulmaModalController as vm'
        })
        .component('bulmaModals', {
            transclude: true,
            template:   '<ng-transclude></ng-transclude>'
        });

})();
// Source: src/modal/modal.controller.js
(function () {

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
        var vm    = this;
        var scope = $scope.$new(true, $scope);

        vm.$onInit = $onInit;

        /**
         * activate
         */
        function $onInit() {
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
    }

})();
// Source: src/modal/modal.model.js
(function () {

angular
        .module('bulma.modal')
        .constant('BulmaModal', BulmaModal)
        .constant('BulmaModalCollection', BulmaModalCollection);

    BulmaModal.prototype.destroy = destroy;
    BulmaModal.prototype.show    = show;
    BulmaModal.prototype.hide    = hide;

    BulmaModalCollection.prototype             = [];
    BulmaModalCollection.prototype.findModal   = findModal;
    BulmaModalCollection.prototype.removeModal = removeModal;

    /**
     * BulmaModal
     * @param {Object} options
     * @constructor
     */
    function BulmaModal(options) {
        this.visible   = false;
        this.getOption = getOption;

        /**
         * Returns a modal option
         * @param {String} option
         * @returns {*}
         * @public
         */
        function getOption(option) {
            if (option in options) {
                return options[option];
            }
            return undefined;
        }
    }

    /**
     * BulmaModalCollection
     * @constructor
     * @extends {Array}
     */
    function BulmaModalCollection() {
    }

    /**
     * Destroy the modal
     * @returns {Boolean}
     * @public
     */
    function destroy() {
        return this
            .getOption('modals')
            .removeModal(this);
    }

    /**
     * Show the modal
     * @returns {BulmaModal}
     * @public
     */
    function show() {
        this.visible = true;
        return this;
    }

    /**
     * Hide the modal
     * @returns {BulmaModal}
     * @public
     */
    function hide() {
        this.visible = false;
        return this;
    }

    /**
     * Returns modal index in collection, -1 if modal not found
     * @param {BulmaModal} modal
     * @returns {Number}
     * @public
     */
    function findModal(modal) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === modal) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Remove a modal from collection
     * @param {BulmaModal} modal
     * @returns {Boolean}
     * @public
     */
    function removeModal(modal) {
        var index = this.findModal(modal);
        if (index !== -1) {
            this.splice(index, 1);
        }
        return false;
    }


})();
// Source: src/progress/progress.component.js
(function () {

angular
        .module('bulma.progress')
        .component('bulmaProgress', {
            bindings:    {
                value: '=',
                max:   '=',
                size:  '=',
                color: '='
            },
            templateUrl: 'src/progress/progress.html',
            controller:  'bulmaProgressController as vm'
        });

})();
// Source: src/progress/progress.controller.js
(function () {

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
// Source: src/tabs/tab/tab.component.js
(function () {

angular
        .module('bulma.tabs.tab')
        .component('bulmaTab', {
            templateUrl: 'src/tabs/tab/tab.html',
            controller:  'bulmaTabsTabController as vm',
            transclude:  true,
            bindings:    {
                title: '@',
                icon:  '@?'
            },
            require:     {
                tabsCtrl: '^bulmaTabs'
            }
        });

})();
// Source: src/tabs/tab/tab.controller.js
(function () {

angular
        .module('bulma.tabs.tab')
        .controller('bulmaTabsTabController', bulmaTabsTabController);

    bulmaTabsTabController.$inject = [];

    /**
     * bulmaTabsTabController
     */
    function bulmaTabsTabController() {
        var vm     = this;
        vm.$onInit = onInit;

        /**
         * Initialize
         */
        function onInit() {
            vm.tabsCtrl.add(this);
        }
    }

})();
// Source: src/tabs/tabs.component.js
(function () {

angular
        .module('bulma.tabs')
        .component('bulmaTabs', {
            bindings:    {
                class: '@?'
            },
            templateUrl: 'src/tabs/tabs.html',
            controller:  'bulmaTabsController as vm',
            transclude:  true
        });

})();
// Source: src/tabs/tabs.controller.js
(function () {

angular
        .module('bulma.tabs')
        .controller('bulmaTabsController', bulmaTabsController);

    bulmaTabsController.$inject = [];

    /**
     * bulmaTabsController
     */
    function bulmaTabsController() {
        var vm    = this;
        vm.tabs   = [];
        vm.class  = vm.class || '';
        vm.select = select;
        vm.add    = add;

        /**
         * Mark a tab as selected
         * @param tab
         */
        function select(tab) {
            angular.forEach(vm.tabs, function (tab) {
                tab.selected = false;
            });
            tab.selected = true;
        }

        /**
         * Add a tab
         * @param tab
         */
        function add(tab) {
            if (vm.tabs.length === 0) {
                select(tab);
            }
            vm.tabs.push(tab);
        }
    }

})();
// Source: src/toast/toast.component.js
(function () {

angular
        .module('bulma.toast')
        .component('bulmaToast', {
            bindings:    {
                toast:  '=',
                inline: '=?'
            },
            templateUrl: 'src/toast/toast.html',
            controller:  'bulmaToastController as vm'
        })
        .component('bulmaToasts', {
            transclude: true,
            template:   '<ng-transclude></ng-transclude>',
            controller: 'bulmaToastsController as vm'
        });

})();
// Source: src/toast/toast.controller.js
(function () {

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

        activate();

        /**
         * Activate the controller
         */
        function activate() {
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
// Source: src/toast/toast.model.js
(function () {

angular
        .module('bulma.toast')
        .constant('BulmaToast', BulmaToast)
        .constant('BulmaToastCollection', BulmaToastCollection);

    BulmaToast.prototype.destroy = destroy;

    BulmaToastCollection.prototype             = [];
    BulmaToastCollection.prototype.findToast   = findToast;
    BulmaToastCollection.prototype.removeToast = removeToast;

    /**
     * @param {Object} options
     * @constructor
     */
    function BulmaToast(options) {
        this.getOption = getOption;

        /**
         * Returns a toast option
         * @param {String} option
         * @returns {*}
         * @public
         */
        function getOption(option) {
            if (option in options) {
                return options[option];
            }
            return undefined;
        }
    }

    /**
     * @constructor
     */
    function BulmaToastCollection() {
    }

    function destroy() {
        this
            .getOption('toasts')
            .removeToast(this);
    }

    /**
     * Returns modal index in collection, -1 if modal not found
     * @param {BulmaToast} toast
     * @returns {Number}
     * @public
     */
    function findToast(toast) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === toast) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Remove a modal from collection
     * @param {BulmaToast} toast
     * @returns {Boolean}
     * @public
     */
    function removeToast(toast) {
        var index = this.findToast(toast);
        if (index !== -1) {
            this.splice(index, 1);
        }
        return false;
    }

})();})(angular);
(function () {

    'use strict';

    angular
        .module('bulma')
        .run(run);
    
    run.$inject = ['$templateCache'];
    
    function run ($templateCache) {
          'use strict';

  $templateCache.put('src/bulma.html',
    "<bulma-modals><bulma-modal ng-repeat=\"modal in vm.modals\" modal=\"modal\"></bulma-modal></bulma-modals><bulma-toasts><bulma-toast ng-repeat=\"toast in vm.toasts\" toast=\"toast\"></bulma-toast></bulma-toasts>"
  );


  $templateCache.put('src/modal/modal.html',
    "<div class=\"modal\" ng-class=\"vm.classes\"></div>"
  );


  $templateCache.put('src/progress/progress.html',
    "<progress class=\"progress is-{{vm.color}}\" value=\"{{vm.value}}\" max=\"{{vm.max}}\">{{vm.value}}%</progress>"
  );


  $templateCache.put('src/tabs/tab/tab.html',
    "<div ng-show=\"vm.selected\" ng-transclude></div>"
  );


  $templateCache.put('src/tabs/tabs.html',
    "<div class=\"tabs {{vm.class}}\"><ul><li ng-repeat=\"tab in vm.tabs\" ng-class=\"{'is-active':tab.selected}\"><a ng-click=\"vm.select(tab)\"><span class=\"icon is-small\" ng-if=\"tab.icon\"><i class=\"{{tab.icon}}\"></i></span> <span>{{tab.title}}</span></a></li></ul></div><div class=\"content {{vm.class}}\" ng-transclude></div>"
  );


  $templateCache.put('src/toast/toast.html',
    "<div class=\"notification {{vm.style}}\" ng-class=\"vm.classes\"><button class=\"delete\" ng-if=\"vm.showClose\" ng-click=\"vm.close()\"></button><div ng-bind-html=\"vm.contents\"></div></div>"
  );

    }

})();
