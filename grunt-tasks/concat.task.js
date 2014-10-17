module.exports = function (grunt) {
  grunt.config('concat', {
    'client-js': {
      src: [
        'build/client/app/ux/**/*.js',
        'build/client/**/*Model.js',
        'build/client/**/*Store.js',
        'build/client/**/*Controller.js',
        'build/client/**/*View.js',
        'build/client/app/app.js'
      ],
      dest: 'build/client/app.js'
    }
  });

};