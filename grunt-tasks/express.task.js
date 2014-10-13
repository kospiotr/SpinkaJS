module.exports = function (grunt) {
  grunt.config('express', {
    dev: {
      options: {
        script: 'build/server/server.js',
        debug: true
      }
    },
    prod: {
      options: {
        script: 'build/server/server.js',
        background: false
      }
    }
  });

};