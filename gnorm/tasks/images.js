const gulp = require('gulp'),
    changed = require('gulp-changed'),
    config = require('../config').images,
    plumber = require('gulp-plumber'),
    imagemin = require('gulp-imagemin'),
    mozjpeg = require('imagemin-mozjpeg'),
    pngquant = require('imagemin-pngquant'),
    log = require('fancy-log');

gulp.task('images', function() {
  return gulp
    .src(config.src)
    // Ignore unchanged files
    .pipe(changed(config.dest))
    .pipe(
      plumber({
        errorHandler: function(error) {
          log(error.message);
          this.emit('end');
        }
      })
    )
    .pipe(
      imagemin(
        [
          imagemin.gifsicle({
            interlaced: true
          }),
          imagemin.svgo({
            multipass: true
          }),
          pngquant({
            quality: '60-80',
            speed: 2
          }),
          mozjpeg({
            dcScanOpt: 0,
            quality: 75,
            quantTable: 2
          })
        ],
        {
          verbose: true
        }
      )
    )
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.dest));
});
