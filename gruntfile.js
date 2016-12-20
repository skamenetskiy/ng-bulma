module.exports = (grunt) => {

    grunt.initConfig({
        concat:      {
            dist:    {
                options: {
                    banner:  `(function(angular){"use strict";\n`,
                    footer:  `})(angular);`,
                    process: function (src, file) {
                        return '// Source: ' + file + '\n' +
                            src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                    }
                },
                files:   [
                    {
                        src:  [
                            'src/**/*.module.js',
                            'src/**/*.js',
                            '!src/**/*.spec.js'
                        ],
                        dest: 'dist/ng-bulma.js'
                    }
                ]
            },
            sass:    {
                files: [
                    {
                        src:  'src/**/*.scss',
                        dest: 'tmp/ng-bulma.scss'
                    }
                ]
            },
            docs:    {
                files: [
                    {
                        src:  [
                            'docs/js/app/**/*.module.js',
                            'docs/js/app/**/*.js'
                        ],
                        dest: 'docs/js/app.js'
                    }
                ]
            },
            docs_md: {
                files: [
                    {
                        src:  [
                            'header.md',
                            'src/**/*.md'
                        ],
                        dest: 'README.md'
                    }
                ]
            }
        },
        sass:        {
            options: {
                style: 'compressed'
            },
            dist:    {
                files: {
                    'dist/ng-bulma.css': 'tmp/ng-bulma.scss'
                }
            }
        },
        uglify:      {
            dist: {
                files: [
                    {
                        src:  'dist/ng-bulma.js',
                        dest: 'dist/ng-bulma.min.js'
                    }
                ]
            }
        },
        ngtemplates: {
            dist: {
                options: {
                    module:    'bulma',
                    bootstrap: ngTemplatesWrapper,
                    append:    true,
                    htmlmin:   {
                        collapseBooleanAttributes:     true,
                        collapseWhitespace:            true,
                        keepClosingSlash:              true,
                        removeAttributeQuotes:         false,
                        removeComments:                true,
                        removeEmptyAttributes:         true,
                        removeRedundantAttributes:     true,
                        removeScriptTypeAttributes:    true,
                        removeStyleLinkTypeAttributes: true
                    }
                },
                src:     'src/**/*.html',
                dest:    'dist/ng-bulma.js'
            }
        },
        copy:        {
            docs_js:           {
                src:     [
                    'bower_components/angular/angular.min.js',
                    'dist/ng-bulma.min.js'
                ],
                dest:    'docs/js/',
                filter:  'isFile',
                expand:  true,
                flatten: true
            },
            docs_css:          {
                src:     [
                    'bower_components/bulma/css/bulma.css',
                    'dist/ng-bulma.css'
                ],
                dest:    'docs/css/',
                filter:  'isFile',
                expand:  true,
                flatten: true
            },
            fontawesome_css:   {
                src:     [
                    'bower_components/font-awesome/css/font-awesome.min.css'
                ],
                dest:    'docs/css/',
                filter:  'isFile',
                expand:  true,
                flatten: true
            },
            fontawesome_fonts: {
                src:     [
                    'bower_components/font-awesome/fonts/*'
                ],
                dest:    'docs/fonts/',
                filter:  'isFile',
                expand:  true,
                flatten: true
            },
            highlight_core:    {
                src:     [
                    'bower_components/highlight/build/highlight.pack.js'
                ],
                dest:    'docs/js/',
                filter:  'isFile',
                expand:  true,
                flatten: true
            },
            highlight_css:     {
                src:     [
                    'bower_components/highlight/src/styles/github.css'
                ],
                dest:    'docs/css/',
                filter:  'isFile',
                expand:  true,
                flatten: true
            },
            highlight_angular: {
                src:     [
                    'bower_components/angular-highlightjs/angular-highlightjs.min.js'
                ],
                dest:    'docs/js/',
                filter:  'isFile',
                expand:  true,
                flatten: true
            }
        },
        clean:       {
            dist: {
                src: [
                    'tmp'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-angular-templates');

    grunt.registerTask('default', [
        'build',
        'docs'
    ]);

    grunt.registerTask('build', [
        'concat:dist',
        'ngtemplates:dist',
        'uglify:dist',
        'concat:sass',
        'sass:dist',
        'clean:dist'
    ]);

    grunt.registerTask('docs', [
        'copy:docs_js',
        'copy:docs_css',
        'copy:fontawesome_css',
        'copy:fontawesome_fonts',
        'copy:highlight_core',
        'copy:highlight_css',
        'copy:highlight_angular',
        'concat:docs',
        'concat:docs_md'
    ]);

    function ngTemplatesWrapper(module, script) {
        return `
(function () {

    'use strict';

    angular
        .module('${module}')
        .run(run);
    
    run.$inject = ['$templateCache'];
    
    function run ($templateCache) {
        ${script}
    }

})();
`;
    }

};