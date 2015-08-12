var gulp = require('gulp'),
    watch = require('gulp-watch'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    collapse = require('bundle-collapser/plugin'),
    watchify = require('watchify'),
    minifycss = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    reactify = require('reactify'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    mocha = require('gulp-mocha'),

    cssSrc = './src/sass/**/*.scss',
    jsIndex = './src/js/index.jsx.js',
    jsSpecs = './specs/**/*.js',
    jsWatch = ['./src/js/**/*.js', jsSpecs],

    browserifyTaskGen = function (isDev, isWatching) {
        process.env.NODE_ENV = isDev ? 'development' : 'production';

        return function () {
            var outputPath = './build/' + (isDev ? 'dev' : 'prod') + '/js/',
                outputName = 'bundle.js',

                bundler = browserify({
                    entries: [jsIndex], // Only need initial file, browserify finds the deps
                    transform: [reactify],
                    debug: isDev,
                    cache: {}, packageCache: {}, fullPaths: isDev && isWatching // Requirement of watchify
                });

            if (isDev && isWatching) {
                bundler = watchify(bundler).on('update', function () { // When any files update
                    var updateStart = Date.now();
                    console.log('Updating!');

                    bundler.bundle() // Create new bundle that uses the cache for high performance
                        .pipe(source(outputName))
                        .pipe(gulp.dest(outputPath));

                    console.log('Updated ' + outputName + '!', (Date.now() - updateStart) + 'ms');
                });
            }

            if (!isDev) {
                bundler = bundler.plugin(collapse);
            }

            return bundler
                .bundle() // Create the initial bundle when starting the task
                .pipe(source(outputName))
                .pipe(buffer())
                .pipe(gulpIf(!isDev, uglify()))
                .pipe(gulp.dest(outputPath));
        };
    },

    cssTaskGen = function (isDev) {
        var outputPath = './build/' + (isDev ? 'dev' : 'prod') + '/css/';

        return function () {

            return gulp.src(cssSrc)
                .pipe(sass({
                    errLogToConsole: true,
                    style: 'nested'
                }))
                .pipe(gulpIf(!isDev, minifycss()))
                .pipe(gulp.dest(outputPath));
        };
    };


gulp.task('js-watch', browserifyTaskGen(true, true));
gulp.task('js-dev', browserifyTaskGen(true, false));

gulp.task('css-dev', cssTaskGen(true));

gulp.task('css-watch', ['css-dev'], function () {
    watch(cssSrc, function () {
        gulp.start('css-dev');
    });
});

gulp.task('html-dev', function () {
    gulp.src('./src/html/*')
        .pipe(gulp.dest('./build/dev/'));
});

/* test */
gulp.task('test', function () {
    return gulp.src('./specs/**/*-spec.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha());
});

gulp.task('test-watch', function () {
    gulp.watch(jsWatch, ['test']);
});

gulp.task('watch', ['test', 'test-watch', 'css-watch', 'js-watch']);

gulp.task('default', ['watch']);

gulp.task('build-dev', ['html-dev', 'js-dev', 'css-dev']);


/* prod tasks */

gulp.task('js-prod', browserifyTaskGen(false, false));

gulp.task('css-prod', cssTaskGen(false));

gulp.task('html-prod', function () {
    gulp.src('./src/html/*')
        .pipe(gulp.dest('./build/prod/'));
});

gulp.task('build-prod', ['html-prod', 'js-prod', 'css-prod']);
