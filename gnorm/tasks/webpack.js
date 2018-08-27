const gulp = require('gulp'),
  log = require('fancy-log'),
  PluginError = require('plugin-error'),
  webpack = require('webpack'),
  webpackConfig = require('../webpack.config');

gulp.task('webpack', [])


// PRODUCTION
gulp.task('webpack:build', function(callback) {
  // modify some webpack config options
  const myConfig = Object.assign(webpackConfig, {
    mode: 'production',
    optimization: {
      minimize: true
    }
  })

  webpack(myConfig, function(err, stats) {
    if (err) {
      throw new PluginError('webpack:build', err)
    }
    log('[webpack:build]', stats.toString({
      colors: true
    }))
    callback()
  })
})


// DEVELOPMENT
// modify some webpack config options
let myDevConfig = Object.assign(webpackConfig, {
  mode: 'development',
  optimization: {
    minimize: false
  }
})

gulp.task('webpack:build-dev', function(callback) {
  // run webpack
  webpack(myDevConfig, function(err, stats) {
    if (err) throw new PluginError("webpack", err);

    log("[webpack:build-dev]", stats.toString({
      colors: true
    }));
    callback();
  });
})
