'use strict';

var browserSync = require('browser-sync');
var config = require('../config.js').browserSync;
var gulp = require('gulp');

gulp.task('browserSync', ['dev'], function() {
  browserSync(config);
});

gulp.task('browserSync:dist', ['build'], function() {
  browserSync(config);
});
