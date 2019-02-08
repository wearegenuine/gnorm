const gulp = require('gulp')

//Builds dev and starts browsersync
gulp.task('default', ['watch'])

//Builds dev
gulp.task('dev', ['webpack:dev', 'styles', 'twig:dev', 'copy'])

//Builds dist
gulp.task('dist', ['browserSync:dist'])

//Builds dist and starts browsersync
gulp.task('build', ['webpack:build', 'styles', 'twig:build', 'copy'])
