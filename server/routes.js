/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
var express = require('express');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/users', require('./api/user'));
  app.use('/api/invite', require('./api/invite'));
  app.use('/api/thread', require('./api/thread'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
//  app.route('/:url(api|auth|app|components|bower_components|assets)/*')
//   .get(errors[404]);

  app.use('/release', express.static('release'));

  app.use('/v4.1', express.static(__dirname + '/v4.1'));

  app.route('/robots.txt')
    .get(function(req, res) {
      res.sendFile(path.join(app.get('appPath'), 'robots.txt'));
    });
    
  app.route('/favicon.ico')
    .get(function(req, res) {
      res.sendFile(path.join(app.get('appPath'), 'favicon.ico'));
    });

  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.join(app.get('appPath'), 'index.html'));
    });
};
