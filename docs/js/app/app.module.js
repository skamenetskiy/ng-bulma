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