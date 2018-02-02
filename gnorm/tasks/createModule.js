const _ = require('underscore'),
    argv = require('yargs').argv,
    config = require('../config').scripts,
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    modify = require('gulp-modify'),
    prettify = require('gulp-jsbeautifier'),
    rename = require('gulp-rename'),
    template = require('gulp-template');

const util = {
  capitalizeFirstLetter: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  },
  checkIfExists: function(arr, name) {
    let exists = false
    const regEx = new RegExp(name + '.*', 'gi')
    arr.forEach(function(v) {
      if (v.match(regEx)) {
        exists = true
      }
    })
    return exists
  },
  getArrayofModules: function(string) {
    string = string[0].match(/({)([\w\s\r\t\/:()'".,]*)/g)
    string = string[0].split('{')
    return string[1].split(',')
  },
  getModulesObject: function(string) {
    return string.match(/(modules+[:\s]*{)([\w\s\r\t\/:()'".,]*)*(})/g)
  },
  sanitizeArray: function(arr) {
    let newArr = []
    arr.forEach(function(v, i) {
      newArr.push(v.replace(/\s/g, ''))
    })
    return newArr
  }
}

// Scaffold a regular JavaScript module with:
// $ gulp create-module --name="moduleName"
//
// Scaffold an asynchronous JavaScript module with:
// $ gulp create-module --name="moduleName" --async
gulp.task('create-module', function() {

  argv.constructor = util.capitalizeFirstLetter(argv.name)

  gulp.src(`${config.modules}/index.js`)
    .pipe(modify({
      fileModifier: function(file, contents) {
        // Get the file content
        let content = contents.toString()

        // Extract the object that contains module references
        let modulesObj = util.getModulesObject(content)

        // Add each module definitation to an array.
        let modulesArr = util.getArrayofModules(modulesObj)

        // Sanitize every item in that aray (spaces, tabs, breaks).
        let modulesArrSanitized = util.sanitizeArray(modulesArr)

        // If it's the first module, then make sure the array is empty
        if(modulesArrSanitized[0] === ''){
          modulesArrSanitized = []

        // Check to make sure module doesn't exist already
        } else if (util.checkIfExists(modulesArrSanitized, argv.name)) {
          let err = new gutil.PluginError('template', 'The module "' +
            argv.name +
            '" already exists. Please choose a unique module name.'
          )
          throw err
        }

        // Add module to sanitized array
        modulesArrSanitized.push(argv.name + ':require(\'./' + argv.name + '/' + argv.name + '.load\')')
        modulesArrSanitized.sort()

        // Replace the content in the index file
        return content.replace(
          /(modules+[:\s]*{)([\w\s\r\t\/:()'".,]*)*(})/g, '$1' + modulesArrSanitized + '$3')
        }
    }))

    // Beautify the file
    .pipe(prettify({
      config: '.jsbeautifyrc',
      mode: 'VERIFY_AND_WRITE'
    }))
    .pipe(gulp.dest(`${config.modules}/`))

  // Scaffold the template files into the module folder
  gulp.src('./gnorm/templates/loader.js')
    .pipe(rename(argv.name + '.load.js'))
    .pipe(template(argv))
    .pipe(gulp.dest(`${config.modules}/${argv.name}`))
  gulp.src('./gnorm/templates/module.js')
    .pipe(rename(argv.name + '.main.js'))
    .pipe(template(argv))
    .pipe(gulp.dest(`${config.modules}/${argv.name}`))

})
