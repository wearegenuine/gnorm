const config = require('../config').markup,
    gulp = require('gulp'),
    include = require('gulp-include')

gulp.task('markup', function() {
  return gulp.src(config.src)
    .pipe(include())
    .pipe(gulp.dest(config.dest))
})
