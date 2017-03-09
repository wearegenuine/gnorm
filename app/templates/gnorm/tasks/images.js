var gulp = require('gulp'),
    changed = require('gulp-changed'),
    config = require('../config').images,
    imagemin = require('gulp-imagemin'),
    imageminMozjpeg = require('imagemin-mozjpeg'),
    pngquant = require('imagemin-pngquant');

gulp.task('images', function() {
  return gulp.src(config.src)
    .pipe(changed(config.dest))
    .pipe(imagemin([
      imagemin.gifsicle(),
      imageminMozjpeg({quality: 80}),
      pngquant({
        quality: '60-80',
        speed: 2
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest(config.dest));
});
