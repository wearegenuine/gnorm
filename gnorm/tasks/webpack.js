const gulp = require('gulp'),
  log = require('fancy-log'),
  PluginError = require('plugin-error'),
  webpack = require('webpack'),
  webpackConfig = require('../webpack.config')

// PRODUCTION
gulp.task('webpack:build', function(callback) {
  const prodConfig = Object.assign(webpackConfig, {
    mode: 'production',
    optimization: {
      minimize: true
    }
  })

  webpack(prodConfig, function(err, stats) {
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
gulp.task('webpack:build-dev', function(callback) {
  const devConfig = Object.assign(webpackConfig, {
    mode: 'development',
    optimization: {
      minimize: false
    }
  })

  webpack(devConfig, function(err, stats) {
    if (err) {
      throw new PluginError('webpack:build-dev', err)
    }

    log("[webpack:build-dev]", stats.toString({
      colors: true
    }))

    callback()
  })
})
