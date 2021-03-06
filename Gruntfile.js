/*
 * grunt-versionMaker
 * https://github.com/yimutian/plug
 *
 * Copyright (c) 2017 Bruce
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },
    // Configuration to be run (and then tested).
    autover: {
      test:{
        options: {
          output:{
             'test':'test/a.js'
           }
        },
       files:{
        'js/':['demo/js/**/*.js']
       }

      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  // grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test',function(){
     grunt.task.run(['autover'])
  });
 

  // By default, lint and run all tests.
  grunt.registerTask('default',['test']);

};
