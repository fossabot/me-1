process.env.NODE_CONFIG_DIR = __dirname + "/../../config";

const config = require("config");
const path = require("path");
const webpack = require("webpack");
const SentryPlugin = require("webpack-sentry-plugin");

const isDevelopment = process.env.WEBPACK_SERVE
    || process.env.NODE_ENV !== "production"
    || process.env.NODE_ENV !== "prd"
    || true;

const resolveMode = () => {
    if (isDevelopment) {
        return "development";
    }

    return "production";
};

const plugins = [
    new webpack.DefinePlugin({
        __WORDS_SERVICE_URL__: JSON.stringify(config.get("wordsServiceUrl")),
        __POSTS_SERVICE_URL__: JSON.stringify(config.get("postsServiceUrl")),
        __PHOTOS_SERVICE_URL__: JSON.stringify(config.get("photosServiceUrl")),
        __CODE_APP_URL__: JSON.stringify(config.get("codeAppUrl")),
        __WORDS_APP_URL__: JSON.stringify(config.get("wordsAppUrl")),
        __POSTS_APP_URL__: JSON.stringify(config.get("postsAppUrl")),
        __PHOTOS_APP_URL__: JSON.stringify(config.get("photosAppUrl")),
        __ASSET_URL__: JSON.stringify(config.get("assetUrl")),
    })
];

if (process.env.TRAVIS_TAG && process.env.SENTRY_AUTH_TOKEN) {
    plugins.push(
        new SentryPlugin({
            organization: process.env.SENTRY_ORG,
            project: process.env.SENTRY_PROJECT,
            apiKey: process.env.SENTRY_AUTH_TOKEN,
            release: process.env.TRAVIS_TAG,
            releaseBody: (version, projects) => {
                return {
                    version,
                    projects,
                    refs: [
                        {
                            repository: process.env.TRAVIS_REPO_SLUG,
                            commit: process.env.TRAVIS_COMMIT
                        }
                    ]
                };
            },
            filenameTransform: name => `~/${name.replace(/dist\//g, "docs/")}`,
            suppressConflictError: true
        })
    );
}

module.exports = {
    mode: resolveMode(),
    devtool: "source-map",
    entry: ["babel-polyfill", `${__dirname}/public/views/index.jsx`],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "www.js",
        publicPath: "/"
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules\/(?!(@randy\.tarampi\/\w+)\/)/,
                loader: "babel-loader",
                options: {
                    forceEnv: "client"
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },
    plugins,
    serve: {
        clipboard: false,
        content: "./dist/",
        host: "localhost",
        port: 8080,
        hotClient: {
            host: "localhost",
            port: 8090,
            allEntries: true,
            logLevel: "trace",
            logTime: true
        },
        devMiddleware: {
            publicPath: "/"
        },
        on: {
            listening: ({server}) => {
                const chokidar = require("chokidar");
                const stringify = require("json-stringify-safe");
                const webSocket = require("ws");

                const socket = new webSocket("ws://localhost:8090");
                const watcher = chokidar.watch(__dirname);

                watcher.on("change", () => {
                    const data = {
                        type: "broadcast",
                        data: {
                            type: "window-reload",
                            data: {},
                        },
                    };

                    socket.send(stringify(data));
                });

                server.on("close", () => {
                    watcher.close();
                });
            },
        },
        add: (app, middleware) => {
            const history = require("connect-history-api-fallback");
            const compress = require("koa-compress");
            const convert = require("koa-connect");

            app.use(compress());
            app.use(convert(history({
                verbose: true,
                rewrites: [
                    {from: /\/photos/, to: "/photos.html"},
                    {from: /\/words/, to: "/words.html"},
                    {from: /\/blog/, to: "/blog.html"}
                ]
            })));
            middleware.webpack();
            middleware.content();
        },
        logLevel: "trace",
        logTime: true
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    filename: "vendor.js",
                    chunks: "all"
                }
            }
        }
    }
};
