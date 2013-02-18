module.exports = function (grunt) {
  grunt.initConfig({
    watch: {
      files: ['**/*', '!build.js'],
      tasks: ['shell:browserify']
    },
    shell: {
      make: {
        command: 'make',
        options: {
          stdout: true
        }
      },
      browserify: {
        command: 'make browserify'
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['shell:make']);
};
