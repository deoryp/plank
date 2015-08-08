'use strict';

var Invite = require('./invite.model');

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
    res.status(200).json(invites);
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
  Invite.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.sendStatus(204);
  });
  /*
  Invite.find({email:req.params.email}).remove(function(err) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
  */
};

