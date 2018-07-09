// require the path module
const path = require('path');
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseConfig = {
    entry: './lib/index.ts',
    optimization: {
        // We no not want to minimize our code.
        minimize: true
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js", "scss"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/
            }
        ]
    },
    node: {
        fs: 'empty'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        libraryTarget: 'umd',
        publicPath: '/dist/',
    },
    externals: {
        jquery: 'jQuery'
    },
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "index.css",
            chunkFilename: "[id].css"
        })
    ]
};


module.exports = function (env) {

    env = env || 'development';

    console.log(`This is ${env} build`);

    var sassRules = {
        test: /\.scss$/,
        use: [
            env === "development" ? {
                loader: MiniCssExtractPlugin.loader,
                options: {}
            } : "style-loader",
            "css-loader", // translates CSS into 
            {
                loader: "sass-loader",
                options: {
                    includePaths: [path.resolve(__dirname, 'scss/**/*.scss')]
                }
            }
        ]
    };

    baseConfig.module.rules.push(sassRules);

    if (env === "development") {
        baseConfig.devtool = 'inline-source-map';
        baseConfig.devServer = {
            contentBase: path.resolve(__dirname, 'app'),
            watchContentBase: true, // watchContentBase only listens for root level appearantly.
        }
        baseConfig.mode = "development";
    }

    return baseConfig;
}