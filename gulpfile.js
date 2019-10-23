const gulp = require('gulp');
const gutil = require('gulp-util');
const {merge} = require('event-stream');
const $ = require('gulp-load-plugins')();
const uglify = require('gulp-uglify-es').default;

// Shared
gulp.task('clean', () => {
    return pipe(
        './dist',
        $.clean()
    );
});

gulp.task('build', (cb) => {
    $.runSequence('clean', 'css', 'wex', 'chrome', cb);
});

gulp.task('default', ['build'], () => {
    gulp.watch(['./src/**/*', './package.json'], ['default']);
});

gulp.task('css', () => {
    return pipe(
        './src/styles/basic.scss',
        $.plumber(),
        $.less({relativeUrls: true}),
        $.autoprefixer({cascade: true}),
        './dist'
    );
});

// WebExtensions
gulp.task('wex:js:ext', [], () => buildJs());

gulp.task('wex:js', ['wex:js:ext'], () => {
    const src = [
        './dist/content.js',
    ];
    return pipe(
        src,
        $.concat('content.js'),
        gutil.env.production && uglify(),
        './dist'
    );
});

gulp.task('wex', ['wex:js']);

// Chrome
gulp.task('chrome:css:libs', () => buildCssLibs('.', 'chrome-extension://__MSG_@@extension_id__/'));
gulp.task('chrome:css', ['chrome:css:libs'], () => buildCss());
gulp.task('chrome', ['chrome:css'], () => prepareWexFolder('chrome'));

gulp.task('chrome:zip', () => {
    return pipe(
        './dist/*',
        $.zip('chrome.zip'),
        './zip'
    );
});

// Helpers
function pipe(src, ...transforms) {
    const work = transforms
        .filter((t) => !!t)
        .reduce((stream, transform) => {
            const isDest = typeof transform === 'string';
            return stream.pipe(isDest ? gulp.dest(transform) : transform).on('error', (err) => {
                gutil.log(gutil.colors.red('[Error]'), err.toString());
            });
        }, gulp.src(src));

    return work;
}

function buildJs(prefix = '.', ctx = {}) {
    const src = [
        `${prefix}/src/utils/**.js`,
        `${prefix}/src/const/**.js`,
        `${prefix}/src/**.js`,
    ];

    return pipe(
        src,
        $.preprocess({context: ctx}),
        $.concat('content.js'),
        './dist'
    );
}

function buildCssLibs(prefix = '.', targetPrefix = '') {
    return merge(
        pipe(
            `${prefix}/libs/file-icons.css`,
            $.replace('../fonts', `${targetPrefix}fonts`),
            './dist'
        ),
        pipe(
            `${prefix}/libs/jstree.css`,
            $.replace('url("32px.png")', `url("${targetPrefix}images/32px.png")`),
            $.replace('url("40px.png")', `url("${targetPrefix}images/40px.png")`),
            $.replace('url("throbber.gif")', `url("${targetPrefix}images/throbber.gif")`),
            './dist'
        )
    );
}

function buildCss(prefix = '.') {
    return pipe(
        [`${prefix}/dist/file-icons.css`, `${prefix}/dist/jstree.css`, `${prefix}/dist/octotree.css`],
        $.concat('content.css'),
        gutil.env.production && $.cssmin(),
        './dist'
    );
}

function prepareWexFolder(browser) {
    return merge(
        pipe(
            './icons/**/*',
            `./dist/icons`
        ),
        pipe(
            './libs/fonts/**/*',
            `./dist/fonts`
        ),
        pipe(
            './libs/images/**/*',
            `./dist/images`
        ),
        pipe(
            './src/config/manifest.json',
            $.preprocess({context: {browser}}),
            $.replace('$VERSION', getVersion()),
            `./dist`
        ),
        pipe(
            './src/config/background.js',
            $.preprocess({context: {browser}}),
            gutil.env.production && uglify(),
            `./dist`
        )
    );
}

function getVersion() {
    delete require.cache[require.resolve('./package.json')];
    return require('./package.json').version;
}

module.exports = {
    pipe,
    buildJs,
    buildCssLibs,
    buildCss
};
