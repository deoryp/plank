'use strict';

// Development specific configuration
// ==================================

var pw = require('../passwords');

module.exports = {
  // MongoDB connection options
  mongo: {
    uri: pw.dev.mongo.db
  },

  seedDB: true
};
