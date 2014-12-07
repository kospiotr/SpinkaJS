module.exports = function (grunt) {
    grunt.config('simplemocha', {
        options: {
            globals: ['expect'],
            timeout: 3000,
            ignoreLeaks: false,
            ui: 'bdd',
            reporter: 'tap'
        },
        all: {src: ['tests/*.js']}
    }
    );

};