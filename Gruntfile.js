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
          }
        }
      },
      standins: {
        src: ['./test/standins/*.js'],
        dest: './dist/standins.js',
        options: {
          aliasMappings: {
            src: ['./test/standins/*.js'],
            dest: 'adapters/',
            flatten: true
          }
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
          ]
        },
        src: ['./index.js'],
        dest: './dist/build.js',
        transform: ['brfs']
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
        files: ['index.js', 'lib/**/*.js', 'test/**/*.js'],
        tasks: ['browserify:standins', 'browserify:dist', 'simplemocha']
      },
      libs: {
        files: ['adapters/**/*'],
        tasks: ['browserify:libs']
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: '.',
          keepalive: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadTasks('./tasks');
  grunt.registerTask('default', ['languages', 'jshint', 'browserify', 'simplemocha', 'uglify']);
};
