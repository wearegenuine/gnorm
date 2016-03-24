var gulp = require('gulp'),
    autoprefixer = require('autoprefixer'),
    browserSync = require('browser-sync'),
    config = require('../config').styles,
    gulpif = require('gulp-if'),
    nano = require('gulp-cssnano'),
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss'),
    sass = require('gulp-sass'),
    sassGlob = require('gulp-sass-glob'),
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

gulp.task('styles', function() {
  return gulp.src(config.src)
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
   // .pipe(sourcemaps.init())
   .pipe(sassGlob())
    .pipe(sass({
      "includePaths": [
        "./node_modules/"
      ]
    }).on('error', sass.logError))
    .pipe(postcss(processors))
    // .pipe(gulpif(!global.devMode, nano(nanoOpts)))
    // .pipe(sourcemaps.write())
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
