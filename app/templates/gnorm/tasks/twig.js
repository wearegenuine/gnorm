var gulp = require('gulp'),
    data = require('gulp-data'),
    twig = require('gulp-twig'),
    path = require('path'),
    config = require('../config').twig;

gulp.task('twig', function () {
    'use strict';
    return gulp.src(config.src)
        .pipe(data(function(file){
          // return require(config.data + path.basename(file.path, '.twig') + '.json'); // 1 file per main template
          // return require(config.data + 'global.json'); // just the global.json file

          // combine global.json with a template file if it exists
          // I've got the data file combining, but can't get the data to pass into the template
          var templateJsonFile = config.data + path.basename(file.path, '.twig') + '.json';
          var newData;

          // this way essentially checks if you can access the file to determine if it exists
          // fs.access(templateJsonFile, fs.F_OK, function(err){
          //   var globalJson = require('../.' + config.data + 'global.json');
          //   if (err) {
          //     //  newData = globalJson;
          //   } else {
          //     var templateJson = JSON.parse(fs.readFileSync(templateJsonFile, 'utf8'));
          //         _.extend(newData, globalJson, templateJson);
          //         // console.log(templateJsonFile);
          //         // console.log(newData);
          //
          //   }
          //   getData(newData);
          // });

          // This method tries to read the file to see if it exists
          fs.readFile(templateJsonFile, 'utf8', function(err, data){
            var globalJson = require('../.' + config.data + 'global.json');
            if (err) {
               newData = globalJson;
            } else {
              // var templateJson = JSON.parse(fs.readFileSync(templateJsonFile, 'utf8'));
                  _.extend(newData, globalJson, data);
                  console.log(templateJsonFile);
                  console.log(newData);
                  console.log(data);

            }
            getData(newData);
          });

          // this is a function to pull the data outside the fs function, otherwise it doesn't exist outside the fs function scope
          function getData(newData){
            // console.log(templateJsonFile);
            // console.log(newData);
            // console.log('getData');
            return newData;
          }
        }))
        .pipe(twig({
          onError: function(){
            //Emits error without killing the server
          }
        }))
        .pipe(gulp.dest(config.dest));
});
