var gulp = require('gulp'),
    include = require('gulp-include'),
    config = require('../config').markup;

gulp.task('markup', function() {
  return gulp.src(config.src)
    .pipe(include())
    .pipe(gulp.dest(config.dest));
});
