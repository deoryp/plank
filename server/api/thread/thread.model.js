'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ThreadSchema = new Schema({
  topic: { type: String, lowercase: true, default: 'general', index: true },
  created: {
      type: Date,
      default: Date.now,
      index: true 
  },
  modified: {
      type: Date,
      default: Date.now,
      index: true 
  },
  lastUpdate: {
      type: Date,
      default: Date.now,
      index: true 
  },
  title: String,
  author: {
    id: String
  },
  markdown: String,
  seenBy: [{
    user: String,
    when: {
      type: Date,
      default: Date.now
    }
  }],
  reply: [{
    created: {
        type: Date,
        default: Date.now
    },
    modified: {
        type: Date,
        default: Date.now
    },
    author: {
      id: String
    },
    markdown: String
  }]
});

ThreadSchema
  .virtual('preview')
  .get(function() {
    return 'preview'; // TODO
  });

/*
ThreadSchema
  .virtual('lastSeen')
  .get(function() {
    return this._lastSeen;
});

ThreadSchema
  .virtual('lastSeen')
  .set(function(lastSeen) {
    return this._lastSeen = lastSeen;
});

ThreadSchema
  .set('lastSeen', {
    getters: true
});

*/

/**
 * Pre-save hook
 */
ThreadSchema
  .pre('save', function(next) {
    if (!this.isNew) {
      this.modified = new Date();
    }
    next();
  });


module.exports = mongoose.model('Thread', ThreadSchema);