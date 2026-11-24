const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const reportsDir = path.resolve(__dirname, 'reports');

// Builds the whole config, including plugin instances, on every call, so separate
// calls (e.g. multi-compiler setups) never share objects or plugin state.
module.exports = (env = {}, argv = {}) => {
	const mode = argv.mode || 'development';
	const isProduction = mode === 'production';
	const isDevServer = Boolean(env.WEBPACK_SERVE);
	// production build written to disk (npm run build), not `webpack serve --mode production`
	const isProductionBuild = isProduction && !isDevServer;

	const plugins = [
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
	];

	// Empty build/ before writing to disk. Skipped under the dev server, which builds in
	// memory; otherwise `npm run dev` would delete the last production build on disk.
	if (!isDevServer) {
		plugins.unshift(new CleanWebpackPlugin());
	}

	// Build artifacts for production builds only, kept in reports/ (git-ignored) so they
	// aren't deployed with build/ and aren't regenerated on every dev-server rebuild.
	if (isProductionBuild) {
		plugins.push(
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
			// static bundle report: no server, no browser
			new BundleAnalyzerPlugin({
				analyzerMode: 'static',
				openAnalyzer: false,
				reportFilename: path.join(reportsDir, 'bundle-report.html'),
			}),
		);
	}

	return {
		mode,
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		output: {
			filename: '[name].[contenthash].js',
			path: path.resolve(__dirname, 'build'),
			publicPath: '/',
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
		// no source maps in production: they embed the original src/** in build/
		devtool: isProduction ? false : 'source-map',
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
		plugins,
		devServer: {
			static: path.resolve(__dirname, 'public'),
			hot: true,
			historyApiFallback: true,
			port: 3000,
			open: true,
		},
	};
};
