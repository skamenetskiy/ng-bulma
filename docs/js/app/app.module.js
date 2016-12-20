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