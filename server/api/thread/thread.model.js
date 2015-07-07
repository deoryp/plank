'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ThreadSchema = new Schema({
  topic: { type: String, lowercase: true, default: 'general', index: true },
  created: {
      type: Number,
      index: true 
  },
  modified: {
      type: Number
  },
  title: String,
  author: {
    id: String,
    handle: String,
    photo: String,
  },
  markdown: String,
  seenBy: [String],
  reply: [{
    created: {
        type: Number
    },
    modified: {
        type: Number
    },
    author: {
      id: String,
      handle: String,
      photo: String,
    },
    markdown: String,
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
    if (this.isNew) {
      this.created = new Date().getTime();
      this.modified = new Date().getTime();
    } else {
      this.modified = new Date().getTime();
    }
    next();
  });


module.exports = mongoose.model('Thread', ThreadSchema);