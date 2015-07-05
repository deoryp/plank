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
      default: Date.now
  },
  title: String,
  author: {
    id: String,
    handle: String,
    photo: String,
  },
  markup: String,
  seenBy: [String],
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
      id: String,
      handle: String,
      photo: String,
    },
    markup: String,
    seenBy: [String],
  }]
});

ThreadSchema
  .virtual('preview')
  .get(function() {
    return 'preview'; // TODO
  });

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