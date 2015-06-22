module.exports = function (grunt) {

  grunt.initConfig({
    watch: {
      project: {
        files: ['public/**/*.js', 'public/**/*.html', 'public/**/*.json', 'public/**/*.css', 'public/*.html'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);

};
