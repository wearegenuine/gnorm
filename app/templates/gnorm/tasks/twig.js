var gulp = require('gulp'),
    data = require('gulp-data'),
    twig = require('gulp-twig'),
    path = require('path'),
    config = require('../config').twig;

gulp.task('twig', function () {
    'use strict';
    return gulp.src(config.src)
        .pipe(data(function(file){
          return require(config.data + 'global.json');
        }))
        .pipe(data(function(file){
          return require(config.data + path.basename(file.path, '.twig') + '.json');
        }))
        .pipe(twig({
          onError: function(){
            //Emits error without killing the server
          }
        }))
        .pipe(gulp.dest(config.dest));
});
