const changed = require('gulp-changed'),
  config = require('../config'),
  gulp = require('gulp')

gulp.task('copy', ['copy:images', 'copy:fonts', 'copy:favicon'])


gulp.task('copy:fonts', function() {
  return gulp.src(config.fonts.src)
    .pipe(changed(config.fonts.dest))
    .pipe(gulp.dest(config.fonts.dest))
})

gulp.task('copy:favicon', function() {
  return gulp.src(config.favicon.src)
    .pipe(changed(config.favicon.dest))
    .pipe(gulp.dest(config.favicon.dest))
})

gulp.task('copy:images', function() {
  return gulp.src(config.images.src)
    .pipe(changed(config.images.dest))
    .pipe(gulp.dest(config.images.dest))
})