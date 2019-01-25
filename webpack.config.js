/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
// Webpack v4
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/js/index.js",
    output: {
        path: __dirname + "/dist",
        publicPath: "",
        filename: "assets/js/main.js"
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader"]
            },

            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.ejs$/,
                use: [{
                    loader: "ejs-compiled-loader",
                }],
                exclude: /node-modules/,

            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: {
                        minimize: true
                    }
                }]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
            },

        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            inject: false,
            hash: true,
            template: "./src/views/pages/index.ejs",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "assets/css/[name].css",
            chunkFilename: "[id].css"
        })
    ]
};