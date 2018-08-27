/* eslint-disable no-sync*/
const config = require('./config');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = {
  context: path.resolve(config.app),
  entry: {
    app: ['babel-polyfill', './scripts/app'],
    fontloader: './scripts/fontloader'
  },
  output: {
    path: path.resolve(config.scripts.dest),
    filename: '[name].built.js',
    chunkFilename: '[name].bundle.js',
    libraryTarget: 'umd'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: config.uglifyOptions
      })
    ]
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'eslint-loader'
        }
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader'
        }
      },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery'
    })
  ]
}
