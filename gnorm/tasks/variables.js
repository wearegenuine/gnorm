const gulp = require('gulp'),
  modify = require('gulp-modify'),
  plumber = require('gulp-plumber'),
  prettify = require('gulp-jsbeautifier'),
  gutil = require('gulp-util'),
  config = require('../config').variables,
  rename = require('gulp-rename'),
  sass = require('gulp-sass');

// Extracts JSON data from CSS comment
// https://github.com/oddbird/sassdoc-theme-herman/blob/master/sass-json-loader.js
function sassJsonLoader(source) {
  const startMarker = '/*! json-encode:';
  const endMarker = '*/';
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start);
  const jsondata = source.slice(start + startMarker.length, end);
  return jsondata;
}

gulp.task('variables', function() {
  return gulp.src(config.src)
    .pipe(plumber({
      errorHandler: function(error) {
        gutil.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(sass({
      includePaths: ['./node_modules/']
    }))
    .pipe(modify({
      fileModifier: function(file, contents) {
        return sassJsonLoader(contents.toString())
      }
    }))
    .pipe(rename({
      extname: '.json'
    }))
    .pipe(prettify({
      config: '.jsbeautifyrc',
      mode: 'VERIFY_AND_WRITE'
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.dest))
})
