var path = require('path');
var rootPath = path.normalize(__dirname + '/..');
var env = process.env.NODE_ENV || 'development';

var pw = require('../passwords');

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'gulp-server'
    },
    port: 4000,
    db: pw.dev.mongo.db
  },

  test: {
    root: rootPath,
    app: {
      name: 'gulp-server'
    },
    port: 3000,
    db: 'mongodb://localhost/gulp-server-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'gulp-server'
    },
    port: 3000,
    db: 'mongodb://localhost/gulp-server-production'
  }
};

module.exports = config[env];
