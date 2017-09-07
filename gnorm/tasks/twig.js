const config = require('../config').twig,
    data = require('gulp-data'),
    gulp = require('gulp'),
    path = require('path'),
    exec = require('child_process').exec;

// Default parameters to pass.
var params = ' --source="'+ config.source + '"' +
    ' --pattern="'+ config.pattern + '"' +
    ' --dest="'+ config.dest + '"' +
    ' --data="'+ config.data + '"' +
    ' --includes="'+ config.includes + '"' +
    ' --global="'+ config.global + '"';

//PRODUCTION
gulp.task('twig:build', function () {
    'use strict';
    params += ' --build="TRUE"';
    exec('php gnorm/scripts/twig.php' + params, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});

//DEVELOPMENT
gulp.task('twig:build-dev', function () {
    'use strict';
    params += ' --build="FALSE"';
    exec('php gnorm/scripts/twig.php' + params, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});
