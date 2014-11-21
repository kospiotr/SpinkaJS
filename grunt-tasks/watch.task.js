module.exports = function (grunt) {
  grunt.config('watch', {
    'client-app': {
      files: 'src/client/**/*',
      tasks: ['build-client-app', 'string-replace:livereload'],
      options: {
        spawn: false,
        livereload: true
      }
    },
    'server-app': {
      files: 'src/server/**/*',
      tasks: ['build-server', 'express:dev'],
      options: {
        spawn: false,
        livereload: true
      }
    }
  });

};