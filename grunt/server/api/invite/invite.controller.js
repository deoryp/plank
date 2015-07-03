'use strict';

var Invite = require('./invite.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of Invite
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  Invite.find({}, function (err, invites) {
    if(err) return res.send(500, err);
    res.json(200, invites);
  });
};

/**
 * Creates a new invite
 * restriction: 'admin'
 */
exports.create = function (req, res, next) {
  var newInvite = new Invite(req.body);
  newInvite.role = 'user';
  newInvite.save(function(err, invite) {
    if (err) return validationError(res, err);
    res.json({ email: invite.email });
  });
};


/**
 * Deletes a invite
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  Invite.find({email:req.params.email}).remove(function(err) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

