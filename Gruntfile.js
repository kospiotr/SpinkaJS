module.exports = function (grunt) {

	grunt.registerTask('dev', ['build', 'watch-build', 'copy:server']);
	grunt.registerTask('build', ['clean', 'process-build', 'copy:extjs']);
	grunt.registerTask('process-build', ['copy:app', 'concat:js', 'copy:server', 'uglify', 'replace']);

	grunt.registerTask('watch-build', ['connect', 'watch']);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			server: {
				options: {
					port: 8080,
					base: 'build/client',
					livereload: true
				} 
			}
		},
		watch: {
			js: {
				files: 'src/client/app/**/*.js',
				tasks: ['process-build']
			},
			js_libs: {
				files: 'bower_components/**/*.*',
				tasks: ['process-build']
			},
			grunt_config: {
				files: 'Gruntfile.js',
				tasks: ['process-build']
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
				src: [
					'build/client/app/ux/**/*.js',
					'build/client/app/model/**/*.js',
					'build/client/app/store/**/*.js',
					'build/client/app/controller/**/*.js',
					'build/client/app/view/**/*.js',
					'build/client/app/app.js'
				],
				dest: 'build/client/app.js'
			}
		},
		copy: {
			app: {
				files: [
					{
						cwd: 'src/client/', src: '**',
						dest: 'build/client', expand: true
					}
				]
			},
			extjs: {
				files: [
					{
						cwd: 'bower_components/extjs-lib/', src: 'ext-all.js',
						dest: 'build/client/extjs', expand: true
					}, {
						cwd: 'bower_components/extjs-lib/', src: 'ext-all-debug.js',
						dest: 'build/client/extjs', expand: true
					}, {
						cwd: 'bower_components/extjs-lib/packages/ext-theme-neptune/build/', src: '**',
						dest: 'build/client/extjs/theme', expand: true
					}, {
						cwd: 'bower_components/extjs-lib/examples/kitchensink/crisp-en/resources/pictos/', src: '**',
						dest: 'build/client/pictos', expand: true
					}
				]
			},
			server: {
				files: [
					{
            cwd: 'src/server/', src: '**', 
            dest: 'build/server', expand: true
          }
				]
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
								'<%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			my_target: {
				files: {
					'build/client/app.min.js': ['build/client/app.js']
				}
			}
		},
		replace: {
			dist: {
				options: {
					patterns: [
						{
							match: 'timestamp',
							replacement: '<%= new Date().getTime() %>'
						}
					]
				},
				files: [
					{cwd: 'build/client/', src: ['index*.html'], dest: 'build/client', expand: true, }
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
	grunt.loadNpmTasks('grunt-replace');
};