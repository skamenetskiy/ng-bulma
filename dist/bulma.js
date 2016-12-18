(function(angular){"use strict";
// Source: src/bulma.module.js
(function () {

angular
        .module('bulma', [
            'bulma.modal'
        ]);

})();
// Source: src/modal/modal.module.js
(function () {

angular
        .module('bulma.modal', []);

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
        'BulmaModalCollection'
    ];

    /**
     * Service container
     * @param $q
     * @param $templateRequest
     * @param BulmaModal
     * @param BulmaModalCollection
     * @returns {Bulma}
     */
    function service($q,
                     $templateRequest,
                     BulmaModal,
                     BulmaModalCollection) {

        Bulma.prototype.modal = modal;

        return new Bulma();

        /**
         * Main bulma object
         * @constructor
         */
        function Bulma() {
            this.modals = new BulmaModalCollection();
        }

        /**
         * Opens a bulma modal window
         * @param options
         * @returns {$q.promise}
         * @public
         */
        function modal(options) {
            var modal = new BulmaModal(prepareOptions(options));

            options.modals = this.modals;
            this.modals.push(modal);

            return $q(function (resolve, reject) {
                if (options.template) {
                    resolve(modal);
                } else {
                    $templateRequest(options.templateUrl)
                        .then(function (template) {
                            options.template = template;
                            resolve(modal);
                        })
                        .catch(reject)
                }
            });
        }

        /**
         * Prepare the options
         * @param {Object} options
         * @returns {Object}
         * @private
         */
        function prepareOptions(options) {
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
    "<bulma-modal ng-repeat=\"modal in vm.modals\" modal=\"modal\"></bulma-modal>"
  );


  $templateCache.put('src/modal/modal.html',
    "<div class=\"modal\" ng-class=\"vm.classes\"></div>"
  );

    }

})();
