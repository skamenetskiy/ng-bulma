module.exports = function (config) {
    config.set({
        basePath:      '',
        frameworks:    ['jasmine'],
        files:         [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'dist/bulma.min.js',
            'src/**/*.spec.js'
        ],
        exclude:       [],
        preprocessors: {},
        reporters:     ['progress'],
        port:          9876,
        colors:        true,
        logLevel:      config.LOG_INFO,
        autoWatch:     true,
        browsers:      [
            'PhantomJS'
        ],
        singleRun:     false,
        concurrency:   Infinity
    })
};