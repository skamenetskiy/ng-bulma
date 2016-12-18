(function () {

    'use strict';

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