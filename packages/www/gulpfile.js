require("../../babel.register.js");

const gulp = require("gulp");

gulp.task("clean", () => {
    const vinylPaths = require("vinyl-paths");
    const del = require("del");

    return gulp.src(["dist/", "build/", "coverage/", ".nyc_output/"], {allowEmpty: true})
        .pipe(vinylPaths(del));
});

gulp.task("copy", () => {
    return gulp
        .src([
            "../../node_modules/materialize-css/dist/fonts/roboto/**",
            "../../node_modules/@fortawesome/fontawesome-free/webfonts/**",
            "node_modules/@randy.tarampi/assets/web/**",
            "node_modules/@randy.tarampi/css/node_modules/materialize-css/dist/fonts/roboto/**",
            "node_modules/@randy.tarampi/css/node_modules/@fortawesome/fontawesome-free/webfonts/**"
        ])
        .pipe(gulp.dest("./dist"));
});

gulp.task("views", () => {
    const path = require("path");
    process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

    const config = require("config");
    const pug = require("gulp-pug");
    const rename = require("gulp-rename");
    const packageJson = require("./package.json");

    return gulp.src(["node_modules/@randy.tarampi/views/templates/index.pug"])
        .pipe(pug({
            locals: {
                bundleName: "www",
                assetUrl: config.get("assetUrl"),
                sentryDsn: config.get("sentryDsn"),
                gtm: config.get("gtm"),
                environment: process.env.NODE_ENV || "local",
                version: packageJson.version,
                name: packageJson.name,
                logger: JSON.stringify(config.get("logger"))
            }
        }))
        .pipe(gulp.dest("./dist"))
        .pipe(rename({basename: "404"}))
        .pipe(gulp.dest("./dist"))
        .pipe(rename({basename: "blog"}))
        .pipe(gulp.dest("./dist"))
        .pipe(rename({basename: "photos"}))
        .pipe(gulp.dest("./dist"))
        .pipe(rename({basename: "words"}))
        .pipe(gulp.dest("./dist"))
        .pipe(rename({basename: "resume"}))
        .pipe(gulp.dest("./dist"));
});

gulp.task("docs:dist", () => {
    return gulp
        .src([
            "dist/**"
        ])
        .pipe(gulp.dest("./docs"));
});

gulp.task("docs:index", () => {
    return gulp
        .src([
            "dist/*.html"
        ])
        .pipe(gulp.dest("."));
});

gulp.task("docs", gulp.series([
    "docs:dist",
    "docs:index"
]));

gulp.task("webpack:dev", function (callback) {
    const WebPack = require("webpack");
    const WebPackConfig = require("./webpack.client.config");
    const webpackConfig = Object.assign({}, WebPackConfig);

    WebPack(webpackConfig, function (err, stats) {
        console.log("[webpack:dev]", stats.toString({colors: true})); // eslint-disable-line no-console
        callback(stats.compilation.errors && stats.compilation.errors[0] && stats.compilation.errors[0]);
    });
});

gulp.task("webpack", function (callback) {
    const WebPack = require("webpack");
    const WebPackConfig = require("./webpack.client.config");
    const webpackConfig = Object.assign({}, WebPackConfig, {
        mode: "production"
    });

    WebPack(webpackConfig, function (err, stats) {
        console.log("[webpack:prod]", stats.toString({colors: true})); // eslint-disable-line no-console
        callback(stats.compilation.errors && stats.compilation.errors[0] && stats.compilation.errors[0]);
    });
});

function isFixed(file) {
    return file.eslint !== null && file.eslint.fixed;
}

gulp.task("eslint", () => {
    const eslint = require("gulp-eslint");
    const gulpIf = require("gulp-if");

    return gulp.src(["**/*.js", "!./node_modules/**/*", "!./dist/**/*", "!./docs/**/*", "!./coverage/**/*", "!./.nyc_output/**/*"])
        .pipe(eslint({fix: true}))
        .pipe(eslint.format())
        .pipe(gulpIf(isFixed, gulp.dest("./")))
        .pipe(eslint.failOnError());
});

gulp.task("sassLint", () => {
    const sassLint = require("gulp-sass-lint");

    return gulp.src("sass/**/*.+(sa|sc|c)ss")
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

gulp.task("pugLint", () => {
    var pugLinter = require("gulp-pug-linter");

    return gulp
        .src("views/**/*.pug")
        .pipe(pugLinter())
        .pipe(pugLinter.reporter("fail"));
});

gulp.task("lint", gulp.parallel([
    "eslint",
    "sassLint",
    "pugLint"
]));

gulp.task("test.unit", () => {
    const mocha = require("gulp-mocha");
    const mochaConfig = require("./mocha.config");

    return gulp.src("test/unit/**/*.{js,jsx}", {read: false, allowEmpty: true})
        .pipe(mocha(mochaConfig));
});

gulp.task("test.integration", () => {
    const mocha = require("gulp-mocha");
    const mochaConfig = require("./mocha.config");

    return gulp.src("test/integration/**/*.{js,jsx}", {read: false, allowEmpty: true})
        .pipe(mocha(mochaConfig));
});

gulp.task("test", gulp.parallel([
    "test.unit",
    "test.integration"
]));

gulp.task("build", gulp.series([
    "clean",
    gulp.parallel(["copy", "views", "webpack"])
]));

gulp.task("build:dev", gulp.series([
    gulp.parallel(["lint", "copy", "views"]),
    "webpack:dev"
]));

gulp.task("dev",
    gulp.series([
        "build:dev"
    ])
);

gulp.task("default", gulp.series(["dev"]));

