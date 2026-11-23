const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const config = {
	entry: path.resolve(__dirname, 'src', 'index.tsx'),
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'build'),
		publicPath: '/',
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
						},
					},
				],
			},
			{
				test: /\.(scss|css)$/,
				use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
		new StatsWriterPlugin({
			filename: 'stats.json', // Will be written to your output directory
			stats: {
				all: false,
				assets: true,
				modules: true,
				chunks: true,
			},
		}),
	],
	devServer: {
		static: path.resolve(__dirname, 'public'),
		hot: true,
		historyApiFallback: true,
		port: 3000,
		open: true,
	},
	mode: 'development',
};

module.exports = (env, argv) => {
	if (argv.mode === 'production') {
		// write a static bundle report (no server, no browser); production only, so
		// dev-server rebuilds don't regenerate it. Kept outside build/ so it isn't deployed.
		config.plugins.push(
			new BundleAnalyzerPlugin({
				analyzerMode: 'static',
				openAnalyzer: false,
				reportFilename: path.resolve(__dirname, 'reports', 'bundle-report.html'),
			}),
		);
	}
	return config;
};
