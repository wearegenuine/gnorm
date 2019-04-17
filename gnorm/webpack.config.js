/* eslint-disable no-sync*/
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const config = require('./config')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  context: path.resolve(config.app),
  entry: {
    app: ['@babel/polyfill', './scripts/app'],
    fontloader: './scripts/fontloader'
  },
  output: {
    chunkFilename: '[name].bundle.js?[hash:6]',
    filename: '[name].built.js',
    path: path.resolve(config.scripts.dest),
    publicPath: '/scripts/'
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
      jQuery: 'jquery/dist/jquery.min',
      $: 'jquery/dist/jquery.min'
    })
  ]
}
