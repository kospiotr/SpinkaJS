var config = require('config');

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  });

  grunt.loadTasks('grunt-tasks');

  grunt.registerTask('test', []);
  
  grunt.registerTask('build', ['clean', 'build-client', 'build-server']);
  grunt.registerTask('build-client', ['build-client-app', 'copy:client-libraries']);
  grunt.registerTask('build-client-app', ['copy:client-app', 'concat', 'uglify', 'string-replace:client-timestamps']);
  grunt.registerTask('build-server', ['copy:server']);

  grunt.registerTask('dev', ['build', 'string-replace:livereload', 'express:dev', 'watch']);
  grunt.registerTask('debug', ['node-inspector:dev']);
  grunt.registerTask('run', ['express:prod']);

};
