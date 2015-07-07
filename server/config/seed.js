/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Invite = require('../api/invite/invite.model');

var Thread = require('../api/thread/thread.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

var seedUser = false;
var seedInvite = false;
var seedThead = true;

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
      email: 'test@test.com',
      role: 'user'
    }, {
      email: 'admin@admin.com',
      role: 'admin'
    }, {
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
      markdown: 'new here is the markdown...',
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

// TODO:: only saving one thread? why??

setTimeout(function() {
  Thread.find(function (err, threads) {
    if(err) { 
      console.log(err);
      return;
    }
    console.log(threads);
  });
}, 5000);


