// require the path module
const path = require('path');
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseConfig = {
    entry: './src/OnOffSwitch.ts',
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
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {}
                    },
                    "css-loader", // translates CSS into 
                    {
                        loader: "sass-loader",
                        options: {
                            includePaths: [path.resolve(__dirname, 'scss/**/*.scss')]
                        }
                    }
                ]
            }
        ]
    },
    node: {
        fs: 'empty'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'OnOffSwitch.js',
        libraryTarget: 'window',
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
            filename: "OnOffSwitch.css",
            chunkFilename: "[id].css"
        })
    ]
};


module.exports = function (env) {

    console.log(`This is ${env} build`);

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