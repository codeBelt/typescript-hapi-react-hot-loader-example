const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin').default;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackHardDiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const pkg = require('./package.json');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const NODE_ENV = process.env.NODE_ENV || 'production';
const isProduction = (NODE_ENV === 'production');
const isDevelopment = (NODE_ENV === 'development');

const webpackConfig = {
    entry: isDevelopment
        ? [
            'babel-polyfill',

            'react-hot-loader/patch', // activate HMR for React
            `webpack-hot-middleware/client?path=http://${HOST}:${PORT}/__webpack_hmr`, // bundle the client for webpack-hot-middleware and connect to the provided endpoint

            './src/client.tsx',
        ]
        : [
            'babel-polyfill',

            './src/client.tsx',
        ],

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },

    output: {
        path: path.join(__dirname, 'dist/public/'),
        chunkFilename: 'assets/scripts/[name].[chunkhash].js',
        filename: isDevelopment
            ? 'main.js'
            : 'assets/scripts/[name].[chunkhash].js',
    },

    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: ['css-hot-loader'].concat(
                    ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    minimize: isProduction,
                                    sourceMap: !isProduction
                                },
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: !isProduction
                                }
                            },
                        ],
                    })
                ),
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: 'tsconfig.json',
                        },
                    },
                ],
                include: path.join(__dirname, 'src'),
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),

        isDevelopment
            ? new webpack.HotModuleReplacementPlugin() // enable HMR globally
            : null,

        isDevelopment
            ? null
            : new webpack.BannerPlugin(`${pkg.version} ${new Date().toString()}`),

        new MiniCssExtractPlugin({
            filename: isDevelopment
                ? 'assets/styles/[name].css'
                : 'assets/styles/[name].[hash].css',
        }),

        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            minify: isProduction ? {collapseWhitespace: true, collapseInlineTagWhitespace: true} : false,
            alwaysWriteToDisk: true,
        }),
        new HtmlWebpackHardDiskPlugin(),

        new CopyWebpackPlugin([
            {
                context: 'src/assets',
                from: '**/*',
                to: 'assets',
                ignore: ['styles/**/*']
            }
        ]),

        new RobotstxtPlugin({
            policy: [
                isProduction
                    ? {userAgent: '*', allow: '/'}
                    : {userAgent: '*', disallow: '/'},
            ],
        }),

        new WriteFilePlugin(), // Forces webpack-dev-server to write files.
    ].filter(Boolean),

    // optimization: {
    //     runtimeChunk: 'single',
    //     splitChunks: {
    //         cacheGroups: {
    //             vendors: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: 'vendors',
    //                 chunks: 'all',
    //                 enforce: true,
    //             },
    //         }
    //     }
    // },

    devtool: isProduction
        ? 'none'
        : 'source-map',

    performance: {
        maxAssetSize: 500000,
    },
};

module.exports = webpackConfig;
