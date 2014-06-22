module.exports = function (grunt) {

    grunt.registerTask('dev', ['build-common', 'build-dev', 'watch-build' ]);
    grunt.registerTask('build-dev', ['copy:ext_resources_testing', 'concat:js']);
    grunt.registerTask('build', ['build-common', 'copy:ext_resources_production', 'concat:js']);

    grunt.registerTask('build-common', ['clean:build']);
    grunt.registerTask('watch-build', ['connect', 'watch' ]);

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: 'build/public',
                    livereload: true
                }
            }
        },
        watch: {
            js: {
                files: 'src/frontend/js/**/*.js',
                tasks: ['build-dev']
            },
            js_libs: {
                files: 'bower_components/**/*.*',
                tasks: ['build-dev']
            },
            build: {
                options: {
                    livereload: true
                },
                files: 'build/**/*.*'
            }
        },
        clean: {
            build: ['build']
        },
        concat: {
            js: {
                src: ['build/public/app.js', 'src/frontend/js/**/*.js'],
                dest: 'build/public/app.js'
            }
        },
        copy: {
            ext_resources_testing: {
                files: [
                    {cwd: 'bower_components/ExtJS-App/testing/App/', src: '**', dest: 'build/public/', expand: true}
                ]
            },
            ext_resources_production: {
                files: [
                    {cwd: 'bower_components/ExtJS-App/production/App/', src: '**', dest: 'build/public/', expand: true}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
};