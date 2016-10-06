/**
 * Gulp script build tasks.
 */

'use strict';

var path = require('path'),
    gulp = require('gulp-help')(require('gulp')),
    conf = require('./conf'),
    runSequence = require('run-sequence'),
    tsConf = require('./../tsconfig.json').compilerOptions,
    sass = require('gulp-sass'),
    $ = require('gulp-load-plugins')(),
    env = require('./env')(process.env.BUILD_ENV),
    replace = require('gulp-replace'),
    del = require('del');

/* Initialize TS Project */
var tsProject = $.typescript.createProject(conf.paths.tsconfig_json);

/* Concat all source, test and typings TS files  */
var tsFiles = [].concat(path.join(conf.paths.src, conf.path_pattern.ts), path.join(conf.paths.test, conf.path_pattern.ts));

var bower = require('gulp-bower');

gulp.task('bower', function(){
    return bower();
});
/**
 * Gulp npm task.
 * Clean lib directory.
 * Typescript compiler will generate all .js files and d.ts references for the source files.
 * Report errors.
 */
gulp.task('transpile-ts', function () {
    return gulp.src([].concat(path.join(conf.paths.src, conf.path_pattern.ts)))
      .pipe($.typescript(tsConf))
      .pipe(gulp.dest(conf.paths.dist))
      .on('error', conf.errorHandler(conf.errors.title.TYPESCRIPT));
});

/**
 * Gulp SASS -> CSS task
 * Report errors.
 */
gulp.task('transpile-sass', function () {
    return gulp.src(conf.path_pattern.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(conf.paths.dist));
});

gulp.task('move-html', () => {
    return gulp.src(conf.path_pattern.html)
        .pipe(gulp.dest(conf.paths.dist));
});
gulp.task('move-data', () =>{
    return gulp.src(conf.path_pattern.data)
    .pipe(gulp.dest(conf.paths.dist + "/data"));
});

/**
 * Gulp temporary scripts generation task for coverage.
 * Typescript compiler will generate all .js files and maps references for the source files.
 * Report errors.
 */
gulp.task('tmp-scripts', function () {
    var res = gulp.src(tsFiles, {
        base: '.'
    })
      .pipe($.sourcemaps.init())
      .pipe($.typescript(tsProject))
      .on('error', conf.errorHandler(conf.errors.title.TYPESCRIPT));

    return res.js
      .pipe($.sourcemaps.write('.', {
          // Return relative source map root directories per file.
          includeContent: false,
          sourceRoot: function (file) {
              var sourceFile = path.join(file.cwd, file.sourceMap.file);
              return path.relative(path.dirname(sourceFile), file.cwd);
          }
      }))
      .pipe(gulp.dest('.'));
});

/**
 * Gulp watch temporary scripts task for error checking.
 * Typescript compiler will generate all .js files and maps references
 * for the source files.
 * Report errors.
 */
gulp.task('tmp-watch-scripts', ['clean-js-tmp'], function () {
    var res = gulp.src(tsFiles, {
        base: '.'
    })
      .pipe($.typescript(tsProject))
      .on('error', conf.errorHandler(conf.errors.title.TYPESCRIPT));
    return res.js
      .pipe(gulp.dest(conf.paths.jsTmp));
});

/**
 * Gulp nsp scripts task.
 * Run node Security check.
 * @param done - done callback function.
 */
gulp.task('nsp', function (done) {
    console.log('nsp has been disabled');
    done();
    //$.nsp({
    //  package: path.resolve('package.json')
    //}, done);
});

/**
 * Gulp build scripts task.
 * Run nsp -> clean build -> show tslint errors and update tsconfig.json in parallel -> run npm.
 * @param done - done callback function.
 */
gulp.task('build-scripts', function (done) {
    runSequence('clean-build', ['tslint'], 'transpile-ts','swap-url', 
        'transpile-sass','move-html', 'move-data', 'index-htmlreplace', done);
});

gulp.task('index-htmlreplace', function() {
    gulp.src(conf.paths.indexTemplate)
        .pipe($.htmlReplace({
            basehref: {
                src: env.basehref,
                tpl: '<base href="%s" />'
            }
        }))
        .pipe($.concat(conf.paths.index))
        .pipe(gulp.dest(conf.paths.root));
});
gulp.task('swap-url', function(){
    if(process.env.BUILD_ENV === 'dev'){
        gulp.src('dist/app-api.service.js')
        .pipe(replace('localhost', 'ltlportaldev.tql.com'))
        .pipe(gulp.dest('dist/'))
    } else if(process.env.BUILD_ENV === 'test'){
        gulp.src('dist/app-api.service.js')
        .pipe(replace('localhost', 'ltllcustomerportalstage.tql.com'))
        .pipe(gulp.dest('dist/'))
    }

});