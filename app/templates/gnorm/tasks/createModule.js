'use strict';

var _ = require('underscore');
var argv = require('yargs').argv;
var gulp = require('gulp');
var gutil = require('gulp-util');
var modify = require('gulp-modify');
var prettify = require('gulp-jsbeautifier');
var rename = require('gulp-rename');
var template = require('gulp-template');
var util = {
  capitalizeFirstLetter: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  checkIfExists: function(arr, name) {
    var exists = false;
    var regEx = new RegExp(name + '.*', 'gi');
    arr.forEach(function(v) {
      if (v.match(regEx)) {
        exists = true;
      }
    });
    return exists;
  },
  getArrayofModules: function(string) {
    string = string[0].match(/({)([\w\s\r\t\/:()'".,]*)/g);
    string = string[0].split('{');
    return string[1].split(',');
  },
  getModulesObject: function(string) {
    return string.match(/(modules+[:\s]*{)([\w\s\r\t\/:()'".,]*)*(})/g);
  },
  sanitizeArray: function(arr) {
    var newArr = [];
    arr.forEach(function(v, i) {
      newArr.push(v.replace(/\s/g, ''));
    });
    return newArr;
  }
};

// Scaffold a regular JavaScript module with:
// $ gulp create-module --name="moduleName"
//
// Scaffold an asynchronous JavaScript module with:
// $ gulp create-module --name="moduleName" --async
gulp.task('create-module', function() {

  argv.constructor = util.capitalizeFirstLetter(argv.name);

  gulp.src('./app/scripts/modules/index.js')
    .pipe(modify({
      fileModifier: function(file, contents) {

        // Get the file content
        var content = contents.toString();

        // Extract the object that contains module references
        var modulesObj = util.getModulesObject(content);

        // Add each module definitation to an array.
        var modulesArr = util.getArrayofModules(modulesObj);

        // Sanitize every item in that aray (spaces, tabs, breaks).
        var modulesArrSanitized = util.sanitizeArray(modulesArr);

        // If it's the first module, then make sure the array is empty
        if(modulesArrSanitized[0] === ''){
          modulesArrSanitized = [];

        // Check to make sure module doesn't exist already
        } else if (util.checkIfExists(modulesArrSanitized, argv.name)) {
          var err = new gutil.PluginError('template', 'The module "' +
            argv.name +
            '" already exists. Please choose a unique module name.'
          );
          throw err;
        }

        // Add module to sanitized array
        modulesArrSanitized.push(argv.name + ':require(\'./' + argv.name +
          '/' + argv.name + '.load\')');
        modulesArrSanitized.sort();

        // Replace the content in the index file
        return content.replace(
          /(modules+[:\s]*{)([\w\s\r\t\/:()'".,]*)*(})/g, '$1' +
          modulesArrSanitized + '$3');
        }
    }))

    // Beautify the file
    .pipe(prettify({
      config: '.jsbeautifyrc',
      mode: 'VERIFY_AND_WRITE'
    }))
    .pipe(gulp.dest('./app/scripts/modules'));

  // Scaffold the template files into the module folder
  gulp.src('./gnorm/templates/loader.js')
    .pipe(rename(argv.name + '.load.js'))
    .pipe(template(argv))
    .pipe(gulp.dest('./app/scripts/modules/' + argv.name));
  gulp.src('./gnorm/templates/module.js')
    .pipe(rename(argv.name + '.main.js'))
    .pipe(template(argv))
    .pipe(gulp.dest('./app/scripts/modules/' + argv.name));

});
