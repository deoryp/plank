'use strict';

var config = require('../conf').browserify;

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var p = require('../../package.json');

// add custom browserify options here

var src = config.bundles.src[0]; // TODO:: do something like the old way with the new way for test files. it might be as simple as making a js test task and breaking the source and the test code paths.

var customOpts = {
  entries: [src],
  transform: ['html2js-browserify'],
  debug: true
};
var opts = assign({}, customOpts);

gulp.task('js', bundle); // so you can run `gulp js` to build the file

var b = browserify(opts);
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(config.entry))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest(config.bundles.dest));
}

gulp.task('browserify', ['js'], function(callback) {
  gulp.src(config.src)
    .pipe(rename({basename:config.name, suffix: '-v' + p.version}))
    .pipe(gulp.dest(config.dest))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.dest));
});