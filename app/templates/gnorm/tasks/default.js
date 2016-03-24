var gulp = require('gulp');

//Builds dev and starts browsersync
gulp.task('default', ['watch']);

//Builds dev
gulp.task('dev', ['fonts', 'webpack:build-dev', 'styles', 'images', 'markup', 'twig', 'copy']);

//Builds dist
gulp.task('dist', ['fonts', 'browserSync:dist']);

//Builds dist and starts browsersync
gulp.task('build', ['fonts', 'webpack:build', 'styles', 'images', 'markup', 'twig', 'copy']);
