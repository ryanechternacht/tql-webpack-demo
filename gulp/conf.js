/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

var gutil = require('gulp-util');

/** Project Name goes here */
var projectName = 'ltl-front';

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
    src: 'src',
    test: 'test',
    jsTmp: '.jsTmp',
    gulp: 'gulp',
    gulpFile: 'gulpfile.js',
    coverage: 'coverage',
    reportDir: 'report',
    docs: 'docs',
    example: 'example',
    main: '/index.ts', /** If you change this you need to update the package.json as well */
    typings_json: __dirname + '/../typings.json',
    tsconfig_json: __dirname + '/../tsconfig.json',
    dist: './dist',
    dist_test: './dist.test',
    karma: __dirname + '/../karma.conf.js',
    indexTemplate: 'index.template.html',
    index: 'index.html',
    root: './'
};

/**
 *  The main file patterns goes here
 */
exports.path_pattern = {
    ts: '**/*.ts',
    js: '**/*.js',
    map: '**/*.map',
    ktp_ts: '**/*.ktp.ts',
    sass: './src/**/*.sass',
    html: './src/**/*.html',
    test: './**/*.[sS]pec.js',
    data: './src/data/**'
};

/**
 *  The main names of your project handle these with care
 */
exports.files = {
    PROJECT_NAME: projectName,
    JSON_DOC: 'doc.json',
    EXAMPLE_HTML: 'index.html'
};

/**
 *  The main report base constants of your project handle these with care
 */
exports.reports = {
    tslint_report_type: 'verbose'
};

/**
 *  The main report base constants of your project handle these with care
 */
exports.errors = {
    title: {
        TYPESCRIPT: 'Typescript'
    }
};

/**
 * Get the locations of the all .ts files via tsconfig.json
 */
exports.tsFilesGlob = (function (c) {
    "use strict";

    return c.filesGlob || c.files || '**/*.ts';
}(require(__dirname + '/../tsconfig.json')));

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function (title) {
    'use strict';

    return function (err) {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
    };
};
