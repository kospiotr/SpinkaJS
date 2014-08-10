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
					base: 'build/public',
					livereload: true
				}
			}
		},
		watch: {
			js: {
				files: 'src/public/app/**/*.js',
				tasks: ['process-build']
			},
			js_libs: {
				files: 'bower_components/**/*.*',
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
					'build/public/app/view/**/*.js',
					'build/public/app/app.js'
				],
				dest: 'build/public/app.js'
			}
		},
		copy: {
			app: {
				files: [
					{
						cwd: 'src/public/', src: '**',
						dest: 'build/public', expand: true
					}
				]
			},
			extjs: {
				files: [
					{
						cwd: 'bower_components/extjs-lib/', src: 'ext-all.js',
						dest: 'build/public/extjs', expand: true
					}, {
						cwd: 'bower_components/extjs-lib/', src: 'ext-all-debug.js',
						dest: 'build/public/extjs', expand: true
					}, {
						cwd: 'bower_components/extjs-lib/packages/ext-theme-neptune/build/', src: '**',
						dest: 'build/public/extjs/theme', expand: true
					}
				]
			},
			server: {
				files: [
					{src: 'src/server.js', dest: 'build/server.js'}
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
					'build/public/app.min.js': ['build/public/app.js']
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
					{cwd: 'build/public/', src: ['index*.html'], dest: 'build/public', expand: true, }
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