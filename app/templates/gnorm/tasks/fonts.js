'use strict'

const config = require('../config'),
    gulp = require('gulp'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    ttf2woff = require('gulp-ttf2woff')

gulp.task('fonts', function() {
  gulp.src([config.app + '/fonts/**/*.ttf'])
    .pipe(ttf2woff2())
    .pipe(ttf2woff())
    .pipe(gulp.dest(config.app + '/fonts/'))
})
