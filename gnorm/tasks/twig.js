const config = require('../config').twig,
    data = require('gulp-data'),
    gulp = require('gulp'),
    path = require('path'),
    exec = require('child_process').exec;


gulp.task('twig', function () {
    'use strict';
    var params = ' --source="'+ config.source + '"' +
        ' --pattern="'+ config.pattern + '"' +
        ' --dest="'+ config.dest + '"' +
        ' --data="'+ config.data + '"' +
        ' --includes="'+ config.includes + '"' +
        ' --global="'+ config.global + '"';
    exec('php gnorm/scripts/twig.php' + params, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
})
