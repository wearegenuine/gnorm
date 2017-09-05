const config = require('../config').twig,
    data = require('gulp-data'),
    gulp = require('gulp'),
    path = require('path'),
    exec = require('child_process').exec;


gulp.task('twig', function () {
    'use strict'
    exec('php twig.php', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
})
