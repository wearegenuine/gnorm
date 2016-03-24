'use strict';

var changed = require('gulp-changed');
var config = require('../config');
var gulp = require('gulp');

gulp.task('copy', ['copy:scripts', 'copy:fonts', 'copy:favicon']);

gulp.task('copy:scripts', function() {
  return gulp.src(config.scripts.libsSrc)
    .pipe(changed(config.scripts.libsDest))
    .pipe(gulp.dest(config.scripts.libsDest));
});

gulp.task('copy:fonts', ['fonts'], function() {
  return gulp.src(config.fonts.src)
    .pipe(changed(config.fonts.dest))
    .pipe(gulp.dest(config.fonts.dest));
});

gulp.task('copy:favicon', function() {
  return gulp.src(config.favicon.src)
    .pipe(changed(config.favicon.dest))
    .pipe(gulp.dest(config.favicon.dest));
});
