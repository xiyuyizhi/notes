
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var isPro = process.env.npm_lifecycle_event == 'build'

var config = {

	entry: {
		app: './src/index',
        vendors:['echarts','rxjs']
	},
	output: {
		path: __dirname + '/docs',
		filename: '[name].[hash].js',
		// publicPath: isPro ? '/react-demo/' : '/'
	},
	resolve: {
		modulesDirectories: ['node_modules', './'],
		alias: {
			'npm': __dirname + '/node_modules'

		},
		extensions: ['', '.js', '.html', '.css', '.jsx']
	},
	devtool: isPro ? 'source-map' : 'eval-source-map',
	module: {
		loaders: [
			{
				test: /\.js|jsx$/,
				loaders: ['babel'],
				exclude: /node_modules/
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract(
					'style-loader',
					'css-loader?sourceMap!less?sourceMap'
				)

			}, {
				test: /\.css/,
				loader: ExtractTextPlugin.extract(
					'style-loader',
					'css-loader?sourceMap'
				)
			}, {
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
				loader: 'file'
			}
		],
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
		new ExtractTextPlugin('[name].[hash].css'),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: true
		}),
	],
	devServer: {
		historyApiFallback:true,
		port: 7777,
	}
}

if (isPro) {
	config.plugins.unshift(new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false,
			drop_debugger: true,
			drop_console: true
		}
	}))
}


module.exports = config
