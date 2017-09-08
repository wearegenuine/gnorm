const gulp = require('gulp'),
    data = require('gulp-data'),
    twig = require('gulp-twig'),
    path = require('path'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),
    config = require('../config').twig;

// De-caching for Data files
function requireUncached($module) {
  delete require.cache[require.resolve($module)];
  return require($module);
}

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
