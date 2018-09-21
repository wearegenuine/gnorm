const config = require('../config').fonts,
  gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  changed = require('gulp-changed'),
  ttf2woff2 = require('gulp-ttf2woff2'),
  ttf2woff = require('gulp-ttf2woff'),
  log = require('fancy-log')

gulp.task('fonts', function() {
  return gulp.src(config.src)
    // Ignore unchanged files
    .pipe(changed(config.dest))
    .pipe(plumber({
      errorHandler: function(error) {
        log(error.message)
        this.emit('end')
      }
    }))
    .pipe(ttf2woff())
    .pipe(ttf2woff2())
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.dest))
})
