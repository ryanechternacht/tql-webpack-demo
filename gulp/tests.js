/**
 * Gulp test tasks.
 */

'use strict';

var path = require('path'),
    gulp = require('gulp-help')(require('gulp')),
    runSequence = require('run-sequence'),
    conf = require('./conf'),
    $ = require('gulp-load-plugins')(),
    Server  = require('karma').Server,
    remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul'),
    tsConf = require('./../tsconfig.json').compilerOptions;


/**
 * Gulp pre coverage test with jasmine and istanbul configuration.
 */
gulp.task('pre-test', ['coverage-build'], function () {
    return gulp.src(path.join(conf.paths.src, conf.path_pattern.js))
      .pipe($.istanbul({
          includeUntested: true
      }))
      .pipe($.istanbul.hookRequire());
});

var runTest = function (reporters, done) {
    var mochaError;

    gulp.src(path.join(conf.paths.dist, conf.path_pattern.test))
      .pipe($.jasmine())
    //   .pipe($.istanbul.writeReports({
    //       dir: conf.paths.coverage,
    //       reporters: reporters,
    //       reportOpts: {
    //           dir: conf.paths.coverage
    //       }
    //   }))
      .on('end', function () {
          done(mochaError);
      });
};

/**
 * Gulp coverage test with jasmine and istanbul configuration.
 * @param done - done callback function.
 */
gulp.task('coverage-test', ['pre-test'], function (done) {
    runTest(['json', 'text', 'text-summary'], done);
});

/**
 * Gulp summary test with jasmine and istanbul configuration.
 * @param done - done callback function.
 */
gulp.task('summary-test', ['pre-test'], function (done) {
    runTest(['text', 'text-summary'], done);
});

/**
 * Gulp coverage task.
 * Cleans temporary created files in sources -> cleans coverage folder -> run coverage test -> remap istanbul support -> clean temporary generated files.
 * @param done - done callback function.
 */
gulp.task('coverage', 'Run tests and generate coverage', function (done) {
    runSequence('clean-source-tmp', 'clean-coverage', 'coverage-test', 'remap-istanbul', 'clean-source-tmp', done);
});

gulp.task('move-js-tests', () => {
    return gulp.src("test/**/*.js")
        .pipe(gulp.dest(conf.paths.dist_test));
});
gulp.task('test', ['build-tests'], function(done){
    new Server({
        configFile: conf.paths.karma,
        singleRun: true
    }, done()).start();
});
gulp.task('watch-test', ['build-tests'], function(){
        new Server({
        configFile: conf.paths.karma,
        singleRun: true
    }).start();

});
gulp.task('build-tests', ['clean-tests'], () => {
    gulp.src("test/**/*.js")
        .pipe(gulp.dest(conf.paths.dist_test));
    
    var files = []
        .concat(path.join(conf.paths.src, conf.path_pattern.ts))
        .concat(path.join(conf.paths.test, conf.path_pattern.ts));

    return gulp.src(files)
      .pipe($.typescript(tsConf))
      .pipe($.filter('**/*.spec.js'))
      .pipe(gulp.dest(conf.paths.dist_test))
      .on('error', conf.errorHandler(conf.errors.title.TYPESCRIPT));
});

/**
 * Gulp coverage build task.
 * clean tmp -> tmp scripts
 */
gulp.task('coverage-build', function (done) {
    runSequence('clean-source-tmp', 'tmp-scripts', done);
});

/**
 * Gulp remap istanbul task.
 * RemapIstanbul will access the coverage-final.json and generate reports.
 * Report errors.
 */
gulp.task('remap-istanbul', function () {
    return gulp.src(path.join(conf.paths.coverage, 'coverage-final.json'))
      .pipe(remapIstanbul({
          reports: {
              'html': path.join(conf.paths.coverage, conf.paths.reportDir),
              fail: true
          }
      }))
      .on('error', conf.errorHandler(conf.errors.title.TYPESCRIPT));
});

gulp.task('build-and-test', done => {
    runSequence('build', 'test');
    done();
});