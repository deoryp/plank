'use strict';

var path = require('path');
var _ = require('lodash');
var merge = require('merge');

var pw = require('../passwords');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

module.exports = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: pw.port,
  host: pw.host,

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
    },
    uri: pw.mongo.db
  },

  google: {
    clientID: pw.google.clientId,
    clientSecret: pw.google.clientSecret,
    callbackURL:  pw.google.callback
  }
};