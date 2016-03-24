'use strict';
var gulp = require('gulp');
var config = require('../config');
gulp.task('watch', ['browserSync'], function() {
  gulp.watch(config.styles.src, ['styles']);
  gulp.watch(config.images.src, ['images']);
  gulp.watch(config.markup.src, ['markup']);
  gulp.watch(config.twig.watchSrc, ['twig']);
  gulp.watch(config.scripts.all, ['webpack:build-dev']);
});
