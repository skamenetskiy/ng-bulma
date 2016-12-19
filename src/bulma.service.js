(function () {

    'use strict';

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
            var $this = this;
            return $q(function (resolve, reject) {
                var modal      = new BulmaModal(prepareOptions(options));
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