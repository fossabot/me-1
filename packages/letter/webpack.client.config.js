const path = require("path");
const webpackBaseConfig = require("../../webpack.client.config.base");
const serve = require("koa-static");
const mount = require("koa-mount");

module.exports = webpackBaseConfig({
    sourceDirectoryPath: __dirname,
    compliationDirectoryPath: path.join(__dirname, "dist"),
    webpackServeMiddleware: [
        mount("/api/letter", serve("./letters"))
    ],
    entry: {
        letter: ["@babel/polyfill", path.join(__dirname, "./public/views/index.jsx")],
        styles: path.join(__dirname, "./styles/style.scss")
    }
});
