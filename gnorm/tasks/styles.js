const browserSync = require('browser-sync'),
  config = require('../config').styles,
  gulp = require('gulp'),
  cssnano = require('cssnano'),
  plumber = require('gulp-plumber'),
  postcss = require('gulp-postcss'),
  sass = require('gulp-sass'),
  sassGlob = require('gulp-sass-glob'),
  sourcemaps = require('gulp-sourcemaps'),
  log = require('fancy-log');


const plugins = [
  cssnano({
    autoprefixer: {
      // CSSNano's implementation of Autoprefixer only removes unnecessary
      // prefixes by default.  `add: true` fixes that.
      // To define browser support, see package.json > browserslist.
      add: true
    },
    discardComments: {
      removeAll: true
    },
    zindex: false,
    options: {
      sourcemap: true
    }
  })
];

gulp.task('styles', function() {
  return gulp
    .src(config.src)
    .pipe(plumber({
      errorHandler: function(error) {
        log(error.message);
        this.emit('end');
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(
      sass({
        includePaths: ['./node_modules/']
      })
    )
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({
      stream: true
    }))
})

// Notes:
//
// CSSnano options documentation:
//   http://cssnano.co/options/
//   http://cssnano.co/optimisations/
//
// PostCSS plugins and options:
//   https://github.com/postcss/gulp-postcss
//   https://github.com/postcss/postcss#plugins
