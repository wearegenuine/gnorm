'use strict';

var config = require('./config').scripts,
    path = require('path'),
    webpack = require('webpack');

module.exports = {
	cache: true,
	context: path.resolve('app'),
	entry: {
		app: './scripts/app',
		fontloader: './scripts/fontloader',
	},
	output: {
		path: config.dest,
		// path: path.resolve('build'),
		publicPath: '/scripts/',
		filename: '[name].built.js',
		chunkFilename: '[name].bundle.js', // name || id || chunkhash
		libraryTarget: 'umd'
	},
	module: {
		preLoaders: [
			{
				test: /\.js$/, // include .js files
				exclude: [/libs/, /node_modules/],
				loader: 'jshint-loader'
			}
		],
		loaders: [
			{
				test: /\.js$|\.jsx$/,
				exclude: [/libs/, /node_modules/],
				loader: 'babel-loader',
				query: {
          presets: ['es2015']
        }
			}
		]
	},
	plugins: [

		// Use this if you want to chunk shared libraries
		// new webpack.optimize.CommonsChunkPlugin('shared.js'),

		new webpack.ProvidePlugin({
			jQuery: 'jquery',
			$: 'jquery'
		})
	],

	// Replace modules by other modules or paths.
	// https://webpack.github.io/docs/configuration.html#resolve
	resolve: {
		// alias: {}
		extensions: ['', '.js', '.es6']
	}
};
