module.exports = function (grunt) {
  grunt.config('copy', {
    'client-app': {
      files: [
        {
          cwd: 'src/client/', src: '**',
          dest: 'build/client', expand: true
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
    },
    'client-libraries': {
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
        }, {
          cwd: 'lib/swagger-node-express/swagger-ui', src: '**',
          dest: 'build/client/rest-docs', expand: true
        }
      ]
    }

  });

};
