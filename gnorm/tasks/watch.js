'use strict'
const config = require('../config'),
    gulp = require('gulp')

gulp.task('watch', ['browserSync'], function() {
  gulp.watch(config.styles.src, ['styles'])
  gulp.watch(config.images.src, ['images'])
  gulp.watch(config.markup.src, ['markup'])
  gulp.watch(config.twig.watchSrc, ['twig:build-dev'])
  gulp.watch(config.scripts.all, ['webpack:build-dev'])
})
