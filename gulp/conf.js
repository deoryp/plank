/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

var gutil = require('gulp-util');

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  src: 'client',
  dist: 'client/dist',
  tmp: '.tmp',
  e2e: 'e2e'
};

/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
  exclude: [/bootstrap.js$/, /bootstrap-sass-official\/.*\.js/, /bootstrap\.css/],
  directory: 'client/bower_components'
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};


var dest = './release';
var src = './client/';
var appJs = 'app/Client.js';
var appSass = 'app/app.scss';

exports.browserify =  {
  entry: appJs,
  src: dest  + '/bundles/' + appJs,
  name: 'theforum',
  dest: dest + '/js',
  
  // Enable source maps
  debug: true,
  // Additional file extentions to make optional
  extensions: ['.js', '.handlebars'],
  // A separate bundle will be generated for each
  // bundle config in the list below
  bundles: {
    src: [src + appJs],
    dest: dest + '/bundles'
  }
};

exports.styles =  {
  src: src + appSass,
  name: 'theforum',
  dest: dest + '/css'
};

exports.partials = {
  src: [],
  name: 'partials.js',
  dest: dest + '/js'
}
