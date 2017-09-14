/* eslint no-sync: "off" */

const browserSync = require('browser-sync'),
  config = require('../config.js').browserSync,
  gulp = require('gulp')

gulp.task('browserSync', ['dev'], function() {
  browserSync(config)
})

gulp.task('browserSync:dist', ['build'], function() {
  browserSync(config)
})
