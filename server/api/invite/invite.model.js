'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InviteSchema = new Schema({
  email: { type: String, lowercase: true },
  role: {
    type: String,
    default: 'user'
  }
});

/**
 * Validations
 */

// Validate empty email
InviteSchema
  .path('email')
  .validate(function(email) {
    return email.length;
  }, 'Email cannot be blank');

// Validate email is not taken
InviteSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({email: value}, function(err, user) {
      if(err) throw err;
      if(user) {
        if(self.id === user.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
}, 'The specified email address is already in use.');

var validatePresenceOf = function(value) {
  return value && value.length;
};


/**
 * Methods
 */
InviteSchema.methods = {
};

module.exports = mongoose.model('Invite', InviteSchema);
