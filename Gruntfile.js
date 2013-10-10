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
    browserify: {
      libs: {
        src: ['three', './adapters/*.js', './vendor/collada_loader'],
        dest: './libs.js',
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
        dest: './standins.js',
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
          external: ['three', 'collada_loader', 'adapters/renderer', 'adapters/transport', 'adapters/clock']
        },
        src: ['./index.js'],
        dest: './build.js',
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
  grunt.registerTask('default', ['jshint', 'browserify', 'simplemocha', 'uglify']);
};
