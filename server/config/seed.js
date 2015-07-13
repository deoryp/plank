/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Invite = require('../api/invite/invite.model');

var Thread = require('../api/thread/thread.model');

var seedUser = false;
var seedInvite = false;
var seedThead = false;

if (seedUser) {
  User.find({}).remove(function() {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@test.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin'
    }, function() {
        console.log('finished populating users');
      }
    );
  });
}

if (seedInvite) {
  Invite.find({}).remove(function() {
    Invite.create({
      email: 'deoryp@gmail.com',
      role: 'admin'
    }, function() {
        console.log('finished populating invites');
      }
    );
  });
}

if (seedThead) {
  Thread.find({}).remove(function() {
    Thread.create({
      topic: 'general',
      title: 'A Thread without a reply',
      author: {
        id: '321abc',
        handle: 'Scott',
        photo: 'http://photo'
      },
      markdown: 'here is the markdown...'
    }, {
      title: 'A Thread with a reply',
      author: {
        id: '321abc',
        handle: 'Scott',
        photo: 'http://photo'
      },
      markdown: '##new here is the markdown...',
      reply: [
        {
          author: {
            id: '321abc',
            handle: 'Scott',
            photo: 'http://photo'
          },
          markdown: 'more markdown'
        }, {
          author: {
            id: 'abc123',
            handle: 'Henry',
            photo: 'http://photo'
          },
          markdown: 'such a reply'
        }
      ]
    }, function(err, docs) {
      if (err) {
        console.error(err);
        //next(err);
      } else {
        console.log(docs);
      }

    })
  });
}


