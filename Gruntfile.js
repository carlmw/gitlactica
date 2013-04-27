module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: 'build.js',
        dest: 'build.min.js'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      uses_defaults: ['index.js', 'lib/**/*.js'],
      tests: {
        options: {
          expr: true
        },
        files: {
          src: ['test/**/*.js']
        }
      }
    },
    browserify2: {
      dist: {
        entry: './index.js',
        compile: './build.js',
        beforeHook: function (bundle) {
          bundle.transform('brfs');
        }
      }
    },
    simplemocha: {
      options: {
        globals: [],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'nyan'
      },
      all: { src: ['test/setup.js', 'test/**/*.js'] }
    },
    watch: {
      lib: {
        files: ['index.js', 'lib/**/*'],
        tasks: ['simplemocha', 'jshint', 'browserify2']
      },
      test: {
        files: 'test/**/*.js',
        tasks: ['simplemocha', 'jshint']
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify2');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['jshint', 'simplemocha', 'browserify2', 'uglify']);
};
