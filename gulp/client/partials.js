'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('release-partials-app', function () {
  return gulp.src([
    path.join(conf.paths.src, '/app/**/*.html')
  ])
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('partials-app.js', {
      module: 'plankApp',
      root: 'app'
    }))
    .pipe(gulp.dest(conf.partials.dest));
});

gulp.task('release-partials-components', function () {
  return gulp.src([
    path.join(conf.paths.src, '/components/**/*.html')
  ])
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('partials-components.js', {
      module: 'plankApp',
      root: 'components'
    }))
    .pipe(gulp.dest(conf.partials.dest));
});


// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('release-fonts', function () {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});
