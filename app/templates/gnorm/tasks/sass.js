var gulp = require('gulp'),
    autoprefixer = require('autoprefixer'),
    browserSync = require('browser-sync'),
    compass = require('gulp-compass'),
    config = require('../config').compass,
    gulpif = require('gulp-if'),
    nano = require('gulp-cssnano'),
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps');

var processors = [
      autoprefixer({
        browsers: '> 1%, last 4 versions',
        map: true
    })], 
    nanoOpts = {
      calc: false,
      mergeIdents: false,
      zindex: false
    };

gulp.task('sass', function() {
  return gulp.src(config.src)
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(compass(config.settings))
    .pipe(postcss(processors))
    .pipe(gulpif(!global.devMode, nano(nanoOpts)))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Notes:
// 
// CSSnano options documentation:
//   http://cssnano.co/options/
//   http://cssnano.co/optimisations/
// 
// PostCSS plugins and options:
//   https://github.com/postcss/gulp-postcss
//   https://github.com/postcss/postcss#plugins
//   
