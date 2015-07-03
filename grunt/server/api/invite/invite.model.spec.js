'use strict';

var should = require('should');
var app = require('../../app');
var Invite = require('./invite.model');

var invite = new Invite({
  email: 'test@test.com',
  role: 'user'
});

describe('Invite Model', function() {
  before(function(done) {
    // Clear users before testing
    Invite.remove().exec().then(function() {
      done();
    });
  });

  afterEach(function(done) {
    Invite.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with no invites', function(done) {
    Invite.find({}, function(err, users) {
      users.should.have.length(0);
      done();
    });
  });

  it('should fail when saving a duplicate invite', function(done) {
    Invite.save(function() {
      var inviteDup = new Invite(invite);
      inviteDup.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  it('should fail when saving without an email', function(done) {
    invite.email = '';
    invite.save(function(err) {
      should.exist(err);
      done();
    });
  });
  
});
