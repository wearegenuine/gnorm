'use strict';
var gulp = require('gulp');
var config = require('../config');
gulp.task('watch', ['browserSync'], function() {
  gulp.watch(config.compass.src, ['sass']);
  gulp.watch(config.images.src, ['images']);
  gulp.watch(config.markup.src, ['markup']);
  gulp.watch(config.scripts.all, ['webpack:build-dev']);
});
