const HtmlWebPackPlugin = require("html-webpack-plugin"),
	  path = require('path');

module.exports = {
  entry: './client/index.jsx',
  module: {
	rules: [
			{
				test: /\.(jsx|js)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader?presets[]=es2015&presets[]=react'
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: "style-loader" // creates style nodes from JS strings
					},
					{
						loader: "css-loader" // translates CSS into CommonJS
					},
					{
						loader: "sass-loader" // compiles Sass to CSS
					}
				]
			},
			{
				test: /\.(pdf|jpg|png|gif|svg|ico)$/,
				use: [
					{
						loader: 'url-loader'
					},
				]
			},
		]
	},
  output: {
		path: __dirname + '/views',
		filename: 'js/bundle.min.js'
  },
  plugins: [
		new HtmlWebPackPlugin ({
			template: './public/index.html',
			filename: 'index.html'
		}),

	],
	watch: true
};