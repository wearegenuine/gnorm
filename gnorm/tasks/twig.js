const config = require('../config').twig,
    data = require('gulp-data'),
    gulp = require('gulp'),
    path = require('path'),
    twig = require('gulp-twig')

gulp.task('twig', function () {
    'use strict'
    return gulp.src(config.src)
        .pipe(data(function(file){
          return require(config.data + 'global.json')
        }))
        .pipe(data(function(file){
          return require(config.data + path.basename(file.path, '.twig') + '.json')
        }))
        .pipe(twig({
          namespaces: { 'includes': config.includes },
          onError: function(){
            //Emits error without killing the server
          }
        }))
        .pipe(gulp.dest(config.dest))
})
