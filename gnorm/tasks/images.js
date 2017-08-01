const changed = require('gulp-changed'),
    config = require('../config').images,
    gulp = require('gulp'),
    imagemin = require('gulp-imagemin')

gulp.task('images', function() {
  return gulp.src(config.src)
    .pipe(changed(config.dest)) // Ignore unchanged files
    .pipe(imagemin()) // Optimize
    .pipe(gulp.dest(config.dest))
})
