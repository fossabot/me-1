const path = require("path");
const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const SentryCliPlugin = require("@sentry/webpack-plugin");

const isDevelopment = process.env.WEBPACK_SERVE
    || process.env.NODE_ENV !== "production"
    || process.env.NODE_ENV !== "prd"
    || slsw.lib.webpack.isLocal
    || true;

const resolveMode = () => {
    if (isDevelopment) {
        return "development";
    }

    return "production";
};

const plugins = [
    new CopyWebpackPlugin([
        {
            from: ".serverless-secrets.json",
            to: ".serverless-secrets.json"
        },
        {
            from: "./data",
            to: "./data"
        }
    ])
];

if (process.env.TRAVIS_TAG) {
    plugins.push(
        new SentryCliPlugin({
            include: ".",
            ignore: ["node_modules", "webpack.serverless.config.js"],
            release: process.env.TRAVIS_TAG,
            debug: true
        })
    );
}

module.exports = {
    entry: slsw.lib.entries,
    mode: resolveMode(),
    optimization: {
        minimize: false
    },
    performance: {
        hints: false
    },
    devtool: "nosources-source-map",
    externals: [nodeExternals({
        whitelist: [
            "serverless-secrets/client",
            /(me\.common\.\w+)/
        ]
    })],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules\/(?!(@randytarampi\/\w+)\/)/,
                loader: "babel-loader",
                options: {
                    forceEnv: "server"
                }
            }
        ]
    },
    plugins,
    output: {
        libraryTarget: "commonjs2",
        path: path.join(__dirname, ".webpack"),
        filename: "[name].js",
        sourceMapFilename: "[file].map"
    }
};
