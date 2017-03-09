var gulp = require('gulp'),
    changed = require('gulp-changed'),
    config = require('../config').images,
    imagemin = require('gulp-imagemin'),
    imageminMozjpeg = require('imagemin-mozjpeg');

gulp.task('images', function() {
  return gulp.src(config.src)
    .pipe(changed(config.dest))
    .pipe(imagemin([
      imagemin.gifsicle(),
      imageminMozjpeg({quality: 80}),
      imagemin.optipng(),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest(config.dest));
});
