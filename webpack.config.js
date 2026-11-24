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
			// relative to output.path: lands in reports/, outside the deployed build/ folder
			filename: '../reports/stats.json',
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
};

// Returns a fresh object on every call, so the shared `config` is never mutated.
module.exports = (env = {}, argv = {}) => {
	const mode = argv.mode || 'development';
	const isProduction = mode === 'production';
	const isDevServer = Boolean(env.WEBPACK_SERVE);

	return {
		...config,
		mode,
		// no source maps in production: they embed the original src/** in build/
		devtool: isProduction ? false : 'source-map',
		plugins: [
			...config.plugins,
			// write a static bundle report (no server, no browser) for production builds only,
			// never from the dev server, so rebuilds don't regenerate it. Kept outside build/
			// so it isn't deployed.
			...(isProduction && !isDevServer
				? [
						new BundleAnalyzerPlugin({
							analyzerMode: 'static',
							openAnalyzer: false,
							reportFilename: path.resolve(__dirname, 'reports', 'bundle-report.html'),
						}),
					]
				: []),
		],
	};
};
