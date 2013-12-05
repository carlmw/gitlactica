module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: 'dist/build.js',
        dest: 'dist/build.js'
      },
      libs: {
        src: 'dist/libs.js',
        dest: 'dist/libs.js'
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
    browserify: {
      libs: {
        src: ['three', './adapters/*.js', './vendor/collada_loader'],
        dest: './dist/libs.js',
        options: {
          alias: [
            'three:three',
            './vendor/collada_loader:collada_loader'
          ],
          aliasMappings: {
            src: ['./adapters/*.js'],
            dest: 'adapters/',
            flatten: true
          },
          transform: ['glslifyify']
        }
      },
      dist: {
        options: {
          external: [
            'three',
            'collada_loader',
            'adapters/renderer',
            'adapters/transport',
            'adapters/clock',
            'adapters/animation'
          ],
          transform: ['hbsfy']
        },
        src: ['./index.js'],
        dest: './dist/build.js'
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
      dist: {
        files: ['index.js', 'lib/**/*.js', 'test/**/*.js', 'lib/templates/*.hbs'],
        tasks: ['browserify:dist', 'simplemocha']
      },
      libs: {
        files: ['adapters/**/*'],
        tasks: ['browserify:libs']
      }
    },
    casperjs: {
      files: ['integration/**/*.js'],
      options: {
        engine: 'slimerjs'
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadTasks('./tasks');
  grunt.registerTask('default', ['languages', 'jshint', 'browserify', 'simplemocha', 'uglify']);
  grunt.registerTask('heroku:production', ['default']);

  try {
    // Skip casper when deploying to heroku
    require.resolve('grunt-casperjs');
    grunt.loadNpmTasks('grunt-casperjs');
    grunt.registerTask('integration', ['start_test_server', 'casperjs', 'close_test_server']);
  } catch (e) {}
};
