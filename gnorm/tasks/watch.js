'use strict'
const config = require('../config'),
    gulp = require('gulp'),
    path = require('path')

gulp.task('watch', ['browserSync'], function() {
  gulp.watch(config.images.src, ['images'])
  gulp.watch(config.twig.watchSrc, ['twig'])
  gulp.watch(config.scripts.all, ['webpack:build-dev'])
  gulp.watch(config.styles.src).on('change', function(file) {
    gulp.start('styles')
    if (path.basename(file.path).split('.')[0] === '_settings'){
      gulp.start('variables')
    }
  })
})
