const gulp = require('gulp'),
  data = require('gulp-data'),
  twig = require('gulp-twig'),
  path = require('path'),
  plumber = require('gulp-plumber'),
  config = require('../config').twig,
  log = require('fancy-log')

// De-caching for Data files
function requireUncached($module) {
  delete require.cache[require.resolve($module)]
  return require($module)
}

let isBuild = '{ "isBuild": true }'

gulp.task('twig:build', ['variables'], function () {
  return gulp.src(config.src)
    .pipe(plumber({
      errorHandler: function(error) {
        log(error.message)
        this.emit('end')
      }
    }))
    .pipe(data(function(file) {
      return JSON.parse(isBuild)
    }))
    .pipe(data(function(file) {
      return requireUncached(config.data + 'global.json')
    }))
    .pipe(data(function(file) {
      return requireUncached(config.data + 'variables.json')
    }))
    .pipe(data(function(file) {
      return requireUncached(config.data + path.basename(file.path, '.twig') + '.json')
    }))
    .pipe(twig({
      namespaces: config.namespaces,
      onError: function() {
        //Emits error without killing the server
      }
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.dest))
})

gulp.task('twig:dev', function () {
  return gulp.src(config.src)
    .pipe(plumber({
      errorHandler: function(error) {
        log(error.message)
        this.emit('end')
      }
    }))
    .pipe(data(function(file) {
      return requireUncached(config.data + 'global.json')
    }))
    .pipe(data(function(file) {
      return requireUncached(config.data + 'variables.json')
    }))
    .pipe(data(function(file) {
      return requireUncached(config.data + path.basename(file.path, '.twig') + '.json')
    }))
    .pipe(twig({
      namespaces: config.namespaces,
      onError: function() {
        //Emits error without killing the server
      }
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.dest))
})
