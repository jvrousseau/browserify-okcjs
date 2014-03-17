/*jslint node: true*/
module.exports = function (grunt) {
    "use strict";

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        watch: {
            css: {
                files: [
                    '*.js',
                    '*.json',
                    '*.html',
                    '!bundle.js',
                    '!bundle.min.js'
                ],
                tasks: ['build'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        },
        asciify: {
            options: {
                font: 'standard',
                log: true
            },
            jslinting: {
                text: "Crockfording"
            },
            browserify: {
                text: "Browserifying"
            },
            uglify: {
                text: "Uglifying"
            }
        },
        jslint: {
            all: {
                src: [
                    'map.js'
                ],
                exclude: [
                    'bundle.js',
                    'bundle.min.js'
                ]
            }
        },
        browserify: {
            dev: {
                files: {
                    'bundle.js': ['map.js']
                },
                options: {
                    transform: [ 'brfs' ],
                    debug: false
                }
            }
        },
        uglify: {
            bundle: {
                files: {
                    'bundle.min.js': ['bundle.js']
                }
            }
        }
    });

    grunt.registerTask('default', []);

    grunt.registerTask('build', ['asciify:jslinting', 'jslint',
        'asciify:browserify', 'browserify',
        'asciify:uglify', 'uglify']);
};
