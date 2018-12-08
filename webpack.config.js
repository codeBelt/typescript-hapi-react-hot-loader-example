const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SimpleProgressPlugin = require('webpack-simple-progress-plugin');
const HtmlWebpackHardDiskPlugin = require('html-webpack-harddisk-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin').default;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const autoprefixer = require('autoprefixer');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const pkg = require('./package.json');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const NODE_ENV = process.env.NODE_ENV || 'production';
const isProduction = (NODE_ENV === 'production');
const isDevelopment = !isProduction;
const SRC_PATH = path.resolve(__dirname, 'src');
const DIST_PATH = path.resolve(__dirname, 'dist');

const webpackConfig = {
    mode: (NODE_ENV === 'production') ? 'production' : 'development',

    entry: isDevelopment
        ? [
            '@babel/polyfill',

            `webpack-hot-middleware/client?path=http://${HOST}:${PORT}/__webpack_hmr`, // bundle the client for webpack-hot-middleware and connect to the provided endpoint

            './src/client.tsx',
        ]
        : [
            '@babel/polyfill',

            './src/client.tsx',
        ],

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],

        // Logic to load either the src/environments/production or src/environments/staging file in the app.
        alias: {
            environment: path.join(SRC_PATH, 'environments', 'production'),
        },
    },

    output: {
        path: path.join(DIST_PATH, 'public'),
        filename: isDevelopment
            ? 'assets/scripts/[name].js'
            : 'assets/scripts/[name].[hash].js',
    },

    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s?css$/,
                use: [
                    'css-hot-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: isProduction,
                            sourceMap: !isProduction,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: !isProduction,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: !isProduction,
                        },
                    },
                ],
            },
            {
                test: /\.(svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            publicPath: '/assets/media/',
                        },
                    },
                ],
                include: path.join(__dirname, 'src'),
            },
        ],
    },

    plugins: [
        new SimpleProgressPlugin(),

        new MiniCssExtractPlugin({
            filename: isDevelopment
                ? 'assets/styles/[name].css'
                : 'assets/styles/[name].[hash].css',
        }),

        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [autoprefixer()],
            },
        }),

        isDevelopment
            ? new webpack.HotModuleReplacementPlugin() // enable HMR globally
            : null,

        isDevelopment
            ? null
            : new webpack.BannerPlugin(`${pkg.version} ${new Date().toString()}`),

        new HtmlWebpackPlugin({
            template: path.join(SRC_PATH, 'index.html'),
            minify: isProduction ? {collapseWhitespace: true, collapseInlineTagWhitespace: true} : false,
            alwaysWriteToDisk: true,
        }),
        new HtmlWebpackHardDiskPlugin(),

        new CopyWebpackPlugin([
            {
                context: 'src/assets',
                from: '**/*',
                to: 'assets',
                ignore: ['styles/**/*'],
            },
        ]),

        new RobotstxtPlugin({
            policy: [
                isProduction
                    ? {userAgent: '*', allow: '/'}
                    : {userAgent: '*', disallow: '/'},
            ],
        }),

        new ForkTsCheckerWebpackPlugin(),

        new WriteFilePlugin(), // Forces webpack-dev-server to write files.

        // new BundleAnalyzerPlugin(),
    ].filter(Boolean),

    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },

    devtool: isProduction
        ? 'none'
        : 'source-map',

    performance: {
        maxAssetSize: 500000,
    },
};

module.exports = webpackConfig;
