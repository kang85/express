module.exports = function(grunt) {
  [
    'grunt-cafe-mocha',
    'grunt-contrib-jshint',
    'grunt-exec',
  ].forEach(function(task) {
    grunt.loadNpmTasks(task);
  });

  var port = grunt.option('port') || 3000;
  console.log(port);

  grunt.initConfig({
    cafemocha: {
      all: { src: 'qa/tests-*.js', options: { ui: 'tdd' }, }
    },
    jshint: { 
      app: ['index.js', 'public/js/**/*.js', 'lib/**/*.js'],
      qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js'],
    },
    exec: {
      linkchecker:
        { cmd: 'linkchecker http://localhost:' + port }
    },
  });

  grunt.registerTask('default', ['cafemocha', 'jshint', 'exec']);
};