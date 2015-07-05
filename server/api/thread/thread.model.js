'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ReplySchema = require('./reply.model');

var ThreadSchema = new Schema({
  topic: { type: String, lowercase: true, default: 'general' },
  created: Date,
  modified: Date,
  title: String,
  author_handle: String,
  author_photo: String,
  markup: String,
  reply: [ReplySchema]
});

ThreadSchema
  .virtual('preview')
  .get(function() {
    return 'preview'; // TODO
  });

ThreadSchema
  .virtual('author')
  .set(function(author) {
    this.author_handle = author.handle;
    this.author_photo = author.photo;
  })
  .get(function() {
    return {
      handle: this.author_handle,
      photo: this.author_photo,
    };
  });


/**
 * Pre-save hook
 */
ThreadSchema
  .pre('save', function(next) {
    if (this.isNew) {
      this.created = new Date();
    } else {
      this.modified = new Date();
    }
    next();
  });


module.exports = mongoose.model('Thread', ThreadSchema);