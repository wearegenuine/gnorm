const gulp = require('gulp'),
    data = require('gulp-data'),
    twig = require('gulp-twig'),
    path = require('path'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),
    config = require('../config').twig,
    sass = require('node-sass');

// De-caching for Data files
function requireUncached($module) {
  delete require.cache[require.resolve($module)];
  return require($module);
}

// Extracts JSON data from CSS comment
// https://github.com/oddbird/sassdoc-theme-herman/blob/master/sass-json-loader.js
function sassJsonLoader(source) {
  const startMarker = '/*! json-encode:';
  const endMarker = '*/';
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start);
  const jsondata = source.slice(start + startMarker.length, end);
  return jsondata;
};

gulp.task('twig', function () {
  return gulp.src(config.src)
    .pipe(plumber({
      errorHandler: function(error) {
        gutil.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(data(function(file) {
      return requireUncached(config.data + 'global.json');
    }))
    .pipe(data(function(file) {
      let result = sass.renderSync({
        file: config.variables,
        includePaths: ['./node_modules/']
      });
      return JSON.parse(sassJsonLoader(result.css.toString()))
    }))
    .pipe(data(function(file) {
      return requireUncached(config.data + path.basename(file.path, '.twig') + '.json');
    }))
    .pipe(twig({
      namespaces: {'includes': config.includes},
      onError: function(){
        //Emits error without killing the server
      }
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.dest));
})
