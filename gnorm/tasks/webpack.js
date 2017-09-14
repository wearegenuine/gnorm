const config = require('../config').scripts,
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  webpack = require('webpack'),
  webpackConfig = require('../webpack.config.js')

gulp.task('webpack', [])


// PRODUCTION
gulp.task('webpack:build', function(callback) {
  // modify some webpack config options
  const myConfig = Object.create(webpackConfig)
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(config.uglifyOptions)
  )

  webpack(myConfig, function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack:build', err)
    }
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }))
    callback()
  })
})


// DEVELOPMENT
// modify some webpack config options
let myDevConfig = Object.create(webpackConfig)
myDevConfig.devtool = 'sourcemap'
myDevConfig.debug = true

// create a single instance of the compiler to allow caching
let devCompiler = webpack(myDevConfig)

gulp.task('webpack:build-dev', function(callback) {
  // run webpack
  devCompiler.run(function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack:build-dev', err)
    }
    gutil.log('[webpack:build-dev]', stats.toString({
      colors: true
    }))
    callback()
  })
})
