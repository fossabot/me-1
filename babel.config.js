const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "config");

const config = require("config");

module.exports = (api) => {
    let presets = [
        [
            "@babel/preset-env",
            {
                targets: {
                    node: "current"
                },
                useBuiltIns: "entry",
                shippedProposals: true
            }
        ],
        [
            "@babel/preset-react",
            {
                development: api.env() !== "prd"
            }
        ]
    ];

    let plugins = [
        "@babel/plugin-proposal-object-rest-spread",
        "react-hot-loader/babel",
        "lodash"
    ];

    switch (api.env()) {
        case "test": {
            plugins.push([
                "minify-replace",
                {
                    replacements: [
                        {
                            identifierName: "__WORDS_SERVICE_URL__",
                            replacement: {
                                type: "stringLiteral",
                                value: config.get("wordsServiceUrl")
                            }
                        },
                        {
                            identifierName: "__POSTS_SERVICE_URL__",
                            replacement: {
                                type: "stringLiteral",
                                value: config.get("postsServiceUrl")
                            }
                        },
                        {
                            identifierName: "__PHOTOS_SERVICE_URL__",
                            replacement: {
                                type: "stringLiteral",
                                value: config.get("photosServiceUrl")
                            }
                        },
                        {
                            identifierName: "__CODE_APP_URL__",
                            replacement: {
                                type: "stringLiteral",
                                value: config.get("codeAppUrl")
                            }
                        },
                        {
                            identifierName: "__WORDS_APP_URL__",
                            replacement: {
                                type: "stringLiteral",
                                value: config.get("wordsAppUrl")
                            }
                        },
                        {
                            identifierName: "__POSTS_APP_URL__",
                            replacement: {
                                type: "stringLiteral",
                                value: config.get("postsAppUrl")
                            }
                        },
                        {
                            identifierName: "__PHOTOS_APP_URL__",
                            replacement: {
                                type: "stringLiteral",
                                value: config.get("photosAppUrl")
                            }
                        },
                        {
                            identifierName: "__RESUME_APP_URL__",
                            replacement: {
                                type: "stringLiteral",
                                value: config.get("resumeAppUrl")
                            }
                        },
                        {
                            identifierName: "__ASSET_URL__",
                            replacement: {
                                type: "stringLiteral",
                                value: config.get("assetUrl")
                            }
                        },
                        {
                            identifierName: "__PUBLISHED_RESUME_URL__",
                            replacement: {
                                type: "stringLiteral",
                                value: config.get("resume.publishUrl")
                            }
                        }
                    ]
                }
            ]);
            plugins.push("istanbul");
            break;
        }

        case "server": {
            presets = [
                [
                    "@babel/preset-env",
                    {
                        targets: {
                            node: "current"
                        },
                        useBuiltIns: "entry",
                        shippedProposals: true
                    }
                ],
                "@babel/preset-react"
            ];
            break;
        }

        case "client": {
            presets = [
                [
                    "@babel/preset-env",
                    {
                        forceAllTransforms: true,
                        useBuiltIns: "entry",
                        shippedProposals: true
                    }
                ],
                [
                    "@babel/preset-react"
                ]
            ];
            break;
        }

        case "development":
        default: {
            plugins.push([
                "minify-replace",
                {
                    replacements: [
                        {
                            identifierName: "__WORDS_SERVICE_URL__",
                            replacement: {
                                type: "stringLiteral",
                                value: config.get("wordsServiceUrl")
                            }
                        },
                        {
                            identifierName: "__POSTS_SERVICE_URL__",
                            replacement: {
                                type: "stringLiteral",
                                value: config.get("postsServiceUrl")
                            }
                        },
                        {
                            identifierName: "__PHOTOS_SERVICE_URL__",
                            replacement: {
                                type: "stringLiteral",
                                value: config.get("photosServiceUrl")
                            }
                        },
                        {
                            identifierName: "__CODE_APP_URL__",
                            replacement: {
                                type: "stringLiteral",
                                value: config.get("codeAppUrl")
                            }
                        },
                        {
                            identifierName: "__WORDS_APP_URL__",
                            replacement: {
                                type: "stringLiteral",
                                value: config.get("wordsAppUrl")
                            }
                        },
                        {
                            identifierName: "__POSTS_APP_URL__",
                            replacement: {
                                type: "stringLiteral",
                                value: config.get("postsAppUrl")
                            }
                        },
                        {
                            identifierName: "__PHOTOS_APP_URL__",
                            replacement: {
                                type: "stringLiteral",
                                value: config.get("photosAppUrl")
                            }
                        },
                        {
                            identifierName: "__RESUME_APP_URL__",
                            replacement: {
                                type: "stringLiteral",
                                value: config.get("resumeAppUrl")
                            }
                        },
                        {
                            identifierName: "__ASSET_URL__",
                            replacement: {
                                type: "stringLiteral",
                                value: config.get("assetUrl")
                            }
                        },
                        {
                            identifierName: "__PUBLISHED_RESUME_URL__",
                            replacement: {
                                type: "stringLiteral",
                                value: config.get("resume.publishUrl")
                            }
                        }
                    ]
                }
            ]);
            break;
        }
    }

    return {
        plugins,
        presets
    };
};