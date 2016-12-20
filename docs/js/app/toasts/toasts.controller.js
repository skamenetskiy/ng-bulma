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