const path = require("path");
const webpackBaseConfig = require("../../webpack.publish.config.base");
const {webpackNodeExternalsWhitelist} = require("../../util");
const nodeExternals = require("webpack-node-externals");

module.exports = webpackBaseConfig({
    sourceDirectoryPath: __dirname,
    compliationDirectoryPath: path.join(__dirname, "build"),
    entry: {
        index: ["@babel/polyfill", path.join(__dirname, "./src/index.js")]
    },
    node: {
        __dirname: false
    },
    target: "node",
    externals: [nodeExternals({
        whitelist: [
            webpackNodeExternalsWhitelist
        ]
    })]
});
