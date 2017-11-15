/*
 * grunt-autover
 * https://github.com/yimutian/plug
 *
 * Copyright (c) 2017 Bruce
 * Licensed under the MIT license.
 */
'use strict';
var path = require('path')
const glob = require('glob')
var fs = require('fs')
let fnv = require('fnv-plus')
/**
 * 去掉文件后缀
 * @param {*} strPath 文件路径
 */
function getPathWithOutFileDot(strPath){
   var ext =strPath.split(path.extname(strPath))
   return ext[0]
}
module.exports = function(grunt) {
  grunt.registerMultiTask('autover', 'The version makder now is running.', function() {
    var options = this.options({
       output:{},
    });
    let mapLsit = {}
    let config = {
       map:{
         '*':{
         }
       }
    }
    // Iterate over all specified file groups.
     this.files.forEach(function(f) {
      // Concat specified files.
        f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
        } else {
          //读取文件
          let data = grunt.file.read(filepath,{encoding:'utf-8'})
          let modulePath = getPathWithOutFileDot( filepath )
          //生成文件的hash值
          let ver = fnv.hash(data,64).str()
          //构建文件名+版本号
           mapLsit[modulePath] =  filepath + '?version='+ver
        }
       })
      if ( mapLsit )
      config.map['*'] = mapLsit
       var output = options.output.test
       if ( output ){
            grunt.file.write(output, grunt.util.normalizelf('require.config='+(JSON.stringify(config))+''));
            // Print a success message.
            grunt.log.writeln('File "' + output + '" created.');
        }else{
          grunt.log.warn('Source file "' + output + '" not found.');
          return false;
        }
    });
  });
};
