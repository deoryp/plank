/**
 * Express configuration
 */

'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var passport = require('passport');

module.exports = function(app) {
  var env = app.get('env');

  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());
  
  app.set('appPath', path.join(config.root, 'release'));
  app.use(morgan('dev'));
  
  console.log('env = ' + env + ', root = ' + config.root)
  
//  app.use(express.static(path.join(config.root, '.tmp')));
  if (process.env.NODE_ENV === 'development') {
    app.use(express.static(path.join(config.root, 'client')));
  }
  
  /*
  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'release', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', config.root + '/release');
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', path.join(config.root, 'release'));
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
    
    
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    

    app.use('/app', express.static(app.get('appPath')));
    app.use('/styles', express.static(app.get('appPath') + '/styles'));
    app.use('/scripts', express.static(app.get('appPath') + '/script'));
    
  }
  */
};