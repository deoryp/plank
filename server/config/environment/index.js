'use strict';

var path = require('path');
var _ = require('lodash');
var merge = require('merge');



var pw;

console.log('process.env');
console.log(process.env);

switch(process.env.NODE_ENV) {
  case 'development':
    pw = require('../passwords');
    break;
  case 'production':
    pw = {
      host: process.env.HOST,
      port: process.env.PORT,
      mongo: {
        db: process.env.MONGO_DB
      },
      google: {
        clientId: process.env.GOOGLE_ID,
        email: process.env.GOOGLE_EMAIL,
        clientSecret: process.env.GOOGLE_SECRET,
        callback: process.env.HOST + '/auth/google/callback'
      }
    };
    break;
  default:
    pw = {};
}

pw = require('../passwords');

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