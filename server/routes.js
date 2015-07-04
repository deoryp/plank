/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/invite', require('./api/invite'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|app|components|bower_components|assets)/*')
   .get(errors[404]);

  app.route('/*').get(errors[404]);
  /*
    .get(function(req, res) {
      
      console.log('returning ' + app.get('appPath')  + '/index.html')
      
      
      
      res.sendfile(app.get('appPath') + '/index.html');
    });
  */
};
