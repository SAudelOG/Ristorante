module.exports = function (grunt) {

  //Load Plugin
  [
    'grunt-contrib-watch',
    'grunt-contrib-jshint',
    'grunt-cafe-mocha'
  ]
  .forEach(function(task){
    grunt.loadNpmTasks(task);
  });

  //Configure plugins
  grunt.initConfig({
    watch: {
      project: {
        files: ['public/**/*.js', 'public/**/*.html', 'public/**/*.json', 'public/**/*.css', 'public/*.html'],
        options: {
          livereload: true
        }
      }
    },
    cafemocha: {
      all:{
        src:'qa/tests-*.js',
        options:{
          ui:'tdd'
        },
      }
    },
    jshint:{
      app:['pizza.js','pizza_cluster.js', './Public/js/main.js'],
      qa:['Gruntfile.js', './Public/qa/**/*.js', './qa/**/*.js']
    }
  });

  //Resgister Tasks
  grunt.registerTask('default', ['cafemocha', 'jshint']);

  grunt.registerTask('watch', ['watch']);
};
