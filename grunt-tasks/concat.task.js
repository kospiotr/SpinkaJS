module.exports = function (grunt) {
  grunt.config('concat', {
    'client-js': {
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
  });

};