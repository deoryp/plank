'use strict';

var path = require('path');
var _ = require('lodash');

var pw = require('../passwords');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 4000,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'plank-secret'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],
  
  hasRole: function(hasRole, needsRole) {
    return this.userRoles.indexOf(hasRole) >= config.userRoles.indexOf(needsRole)
  },

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  google: {
    clientID: pw.google.clientId,
    clientSecret: pw.google.clientSecret,
    //clientID:     //process.env.GOOGLE_ID || 'id',
    //clientSecret: process.env.GOOGLE_SECRET || 'secret',
//    callbackURL:  (process.env.DOMAIN || '') + '/auth/google/callback'
    callbackURL:  'http://localhost:1337/auth/google/callback'
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});