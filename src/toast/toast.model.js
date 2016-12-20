(function () {

    'use strict';

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

})();