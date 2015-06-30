var gulp = require('gulp'),
    watch = require('gulp-watch'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    collapse = require('bundle-collapser/plugin'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    mocha = require('gulp-mocha'),

    jsIndex = './src/js/index.js',
    jsSpecs = './specs/**/*.js',
    jsWatch = ['./src/js/**/*.js', jsSpecs],

    browserifyTaskGen = function (isDev, isWatching) {
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
    };


gulp.task('js-watch', browserifyTaskGen(true, true));
gulp.task('js-dev', browserifyTaskGen(true, false));


/* test */
gulp.task('test', function () {
    return gulp.src('./specs/**/*-spec.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha());
});

gulp.task('test-watch', function () {
    gulp.watch(jsWatch, ['test']);
});

gulp.task('watch', ['test', 'test-watch', 'js-watch']);

gulp.task('default', ['watch']);

gulp.task('build-dev', ['js-dev']);

/* prod tasks */

gulp.task('js-prod', browserifyTaskGen(false, false));

gulp.task('build-prod', ['js-prod']);
