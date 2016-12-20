(function () {

    'use strict';

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