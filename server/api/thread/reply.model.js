'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReplySchema = new Schema({
  created: Date,
  modified: Date,
  author_handle: String,
  author_photo: String,
  markup: String
});

ReplySchema
  .virtual('preview')
  .get(function() {
    return 'preview'; // TODO
  });
  
ReplySchema
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
  
ReplySchema
  .pre('save', function(next) {
    if (this.isNew) {
      this.created = new Date();
    } else {
      this.modified = new Date();
    }
    next();
  });


module.exports = mongoose.model('ThreadReply', ReplySchema);