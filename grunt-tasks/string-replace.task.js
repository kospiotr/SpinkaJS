module.exports = function (grunt) {
  grunt.config('string-replace', {
    'client-timestamps': {
      options: {
        replacements: [{
            pattern: '\@\@timestamp',
            replacement: '<%= new Date().getTime() %>'
          }]
      },
      files: [
        {cwd: 'build/client/', src: ['index*.html'], dest: 'build/client', expand: true, }
      ]
    },
    'livereload': {
      options: {
        replacements: [{
            pattern: '\<\/head\>',
            replacement: '	<script src="//localhost:35729/livereload.js"></script>\n	</head>'
          }]
      },
      files: [
        {cwd: 'build/client/', src: ['index*.html'], dest: 'build/client', expand: true, }
      ]
    },

  });

};