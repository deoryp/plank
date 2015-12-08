'use strict';

var _ = require('lodash');

var User = require('./user.model');

var Invite = require('../invite/invite.model');

var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  
  User.find({}, '-salt -hashedPassword', function (err, users) {
    console.log(JSON.stringify(users));
  });
  
  exports.cache(function(users) {
    
    
    
    var userList = [];
    
    _.each(users, function (user) {
      userList.push({
        "id": user._id,
        "handle": user.handle,
        "photo": user.photo,
        "email": user.email,
        "role": user.role
      });
    });
    
    res.status(200).json(userList);
  })
  /*
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    
    
    
    res.status(200).json(users);
  });
  */
};

var cache = {};

exports.cache = function(callback) {
  var fresh = false;
  if (typeof cache.users != 'undefined') {
    callback(cache.users);
  } else {
    cache.users = {};
    fresh = true;
  }
  // Update users cache.
  User.find({}, '-salt -hashedPassword', function (err, users) {
    _.each(users, function (user) {
      cache.users[user._id] = {
        photo: user.google.image.url,
        handle: user.google.displayName,
        email: user.email
      };
      Invite.find({ email: user.email.toLowerCase() }, function (err, invite) {
        if (err) return next(err);
        if (invite && invite.length === 1) {
          cache.users[user._id].role = invite[0].role;
        } else {
          cache.users[user._id].role = 'invalid';
        }
      });
    });
    var id = '';
    if (fresh) {
      callback(cache.users);
    }
  });
}

/*

        console.log(req.user);
        
        Invite.find({ email: req.user.email.toLowerCase() }, function (err, invite) {
          console.log('find by email for invite...');
          console.log(invite);
          if (!invite || invite.length !== 0) return res.send(401);

        });
*/

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

var updateGoogleUser = function(userId, callback) {
  process.nextTick(function() {
    
/*
  
var google = require('googleapis');
var plus = google.plus('v1');
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

// Retrieve tokens via token exchange explained above or set them:
oauth2Client.setCredentials({
  access_token: 'ACCESS TOKEN HERE',
  refresh_token: 'REFRESH TOKEN HERE'
});

plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, response) {
  // handle err and response
});
      
*/        
    
    if (callback) {
      callback();
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  
  // Non Blocking.
  updateGoogleUser(userId);
  
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    Invite.find({ email: user.email.toLowerCase() }, function (err, invite) {
      if (err) return next(err);
      if (invite && invite.length === 1) {
        user.role = invite[0].role;
        res.json(user);
      } else {
        return res.send(401);
      }
    });
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
