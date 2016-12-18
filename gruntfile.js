module.exports = (grunt) => {

    grunt.initConfig({
        concat:      {
            dist: {
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
                        dest: 'dist/bulma.js'
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
        uglify:      {
            dist: {
                files: [
                    {
                        src:  'dist/bulma.js',
                        dest: 'dist/bulma.min.js'
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
                dest:    'dist/bulma.js'
            }
        },
        copy:        {
            docs_js:  {
                src:     [
                    'bower_components/angular/angular.min.js',
                    'dist/bulma.min.js'
                ],
                dest:    'docs/js/',
                filter:  'isFile',
                expand:  true,
                flatten: true
            },
            docs_css: {
                src:     [
                    'bower_components/bulma/css/bulma.css'
                ],
                dest:    'docs/css/',
                filter:  'isFile',
                expand:  true,
                flatten: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-angular-templates');

    grunt.registerTask('default', [
        'concat:dist',
        'ngtemplates:dist',
        'uglify:dist'
    ]);

    grunt.registerTask('docs', [
        'copy:docs_js',
        'copy:docs_css',
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