'use strict';

var config = require('./config').scripts;
var webpack = require('webpack');

module.exports = {
	cache: true,
	entry: {
		app: config.src,
	},
	output: {
		path: config.dest,
		publicPath: '/scripts/',
		filename: '[name].js',
		chunkFilename: '[name].bundle.js' // name || id || chunkhash
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
				test: /\.jsx?$/,
				exclude: [/libs/, /node_modules/],
				loader: 'babel-loader'
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
