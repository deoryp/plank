'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../conf');
var rename = require("gulp-rename");
var minifyCSS = require('gulp-minify-css');
var p = require('../../package.json');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('client-styles', function () {
  var sassOptions = {
    style: 'expanded'
  };

  var injectFiles = gulp.src([
    path.join(conf.paths.src, '/app/**/*.scss'),
    path.join(conf.paths.src, '/components/**/*.scss'),
    path.join('!' + conf.paths.src, '/app/app.scss')
  ], { read: false });

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace(conf.paths.src + '/app/', '');
      return '@import "' + filePath + '";';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  return gulp.src([path.join(conf.paths.src, '/app/app.scss')])
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe($.sourcemaps.init())
    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe(rename({basename:conf.styles.name, suffix: '-v' + p.version}))
    .pipe(gulp.dest(conf.styles.dest))
    .pipe(minifyCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(conf.styles.dest))
    .pipe(browserSync.reload({ stream: true }));
});
