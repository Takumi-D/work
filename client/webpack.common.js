const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "public"),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: "asset/inline",
            },
            {
                test: /\.ts(x?)$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|css)$/,
                use: ["style-loader", "css-loader", "sass-loader"],
                exclude: /node_modules/,
            },
            {
                test: /\.svg$/,
                type: "asset/resource",
                generator: {
                    filename: path.join("icons", "[name].[contenthash][ext]"),
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html"),
        }),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx", ".css", ".scss"],
    }
};