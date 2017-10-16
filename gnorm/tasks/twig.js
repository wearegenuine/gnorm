const config = require('../config').twig,
    data = require('gulp-data'),
    gulp = require('gulp'),
    path = require('path'),
    exec = require('child_process').exec,
    shellescape = require('shell-escape');


// Default command to run.  Passing a json encoded config.
var cmd = ['php', 'gnorm/scripts/twig.php', '-c', JSON.stringify(config)];

//PRODUCTION
gulp.task('twig:build', function () {
    'use strict';
    cmd.push('-b', 'TRUE');
    exec(shellescape(cmd), function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});

//DEVELOPMENT
gulp.task('twig:build-dev', function () {
    'use strict';
    cmd.push('-b', 'FALSE');
    exec(shellescape(cmd), function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});
