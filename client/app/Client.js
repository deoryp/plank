'use strict';


/* Dependent Files */
var $ = require('jquery');
var jQuery = $;

var angular = require('angular');
require('../bower_components/json3/lib/json3');
require('angular-resource');
require('angular-cookies');
require('angular-sanitize');
require('angular-ui-router');

require('../bower_components/angular-bootstrap/ui-bootstrap-tpls');

require('../bower_components/lodash/dist/lodash.compat');

require('angular-animate');
require('angular-touch');

//require('../bower_components/toastr/toastr'); // notifications
//require('../bower_components/moment/moment'); // time

var marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

var toMarkdown = require('to-markdown');

// Create the app
//
require('../app/app.js');

// Wire in deps we might need
//
angular.module('plankApp')
  .factory('$', function get$() {
    return $;
  }).factory('marked', function getMarked() {
    return marked;
  }).factory('toMarkdown', function getToMarkdown() {
    return toMarkdown;
  });


/* App Files */

require('../components/slabtext/slabtext');
require('../components/bootstrap-markdown/bootstrap-markdown');
require('../components/thread/thread.controller');
require('../components/thread/thread-reply.controller');
require('../components/thread/thread-preview.controller');
require('../components/navbar/navbar.controller');
require('../components/mongoose-error/mongoose-error.directive');
require('../components/modal/modal.service');
require('../components/footer/footer.controller');
require('../components/auth/user.service');
require('../components/auth/invite.service');
require('../components/auth/auth.service');
require('../app/forum/modal/modal.service');
require('../app/account/settings/settings.controller');
require('../app/account/login/login.controller');
require('../app/main/main');
require('../app/main/main.controller');
require('../app/forum/forum');
require('../app/forum/forum-thread.controller');
require('../app/forum/forum-list.controller');
require('../app/admin/admin');
require('../app/admin/admin.controller');
require('../app/account/account');
