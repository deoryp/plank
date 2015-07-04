'use strict';

angular.module('plankApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('forum', {
        url: '/forum/:forum',
        templateUrl: 'app/forum/list.html',
        controller: 'ForumCtrl'
      })
      .state('forumView', {
        url: '/forum/:forum/:id',
        templateUrl: 'app/forum/thread.html',
        controller: 'ForumThreadCtrl'
      });
  });