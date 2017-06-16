'use strict'

const del = require('del'),
    gulp = require('gulp')

gulp.task('clean', function() {
  return del([
    'build/**/*'
  ])
})
