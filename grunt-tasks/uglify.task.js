module.exports = function (grunt) {
  grunt.config('uglify', {
    options: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
              '<%= grunt.template.today("yyyy-mm-dd") %> */'
    },
    'client-app': {
      files: {
        'build/client/app.min.js': ['build/client/app.js']
      }
    }

  });

};