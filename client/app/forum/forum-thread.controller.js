'use strict';

angular.module('plankApp')
  .controller('ForumThreadCtrl', function ($scope, $stateParams, $http, $interval) {
    
    $scope.thread = {};
    
    $http.get('/api/users/me').success(function(user) {
      $scope.user = user;
    });
    
    // TODO:: this should come from the db at some point later.
    
    $scope.back = {
      href: '/forum/' + $stateParams.forum
    };
    
    if ($stateParams.forum === 'general') {
      $scope.back.title = 'General';
    } else if ($stateParams.forum === 'media') {
      $scope.back.title = 'Media';
    } else if ($stateParams.forum === 'events') {
      $scope.back.title = 'Events';
    }
    
    var updateThread = function() {
      $http.get('/api/thread/' + $stateParams.forum + '/' + $stateParams.id).success(function(thread) {
        
        // fix up the parent thread
        //
        if (typeof thread.me === 'undefined') {
          thread.me = {};
        }
        if (!thread.me.seen) {
          thread.me.updates = true;
        } else {
          thread.me.seen = new Date(thread.me.seen);
          thread.lastUpdate = new Date(thread.lastUpdate);
          
          if (thread.me.seen < thread.lastUpdate) {
            thread.me.updates = true;
          }
        }
        
        // TODO:: this is not working. it is also really hard to test but I think the last seen date is coming in as always newer than existing. so we need to make sure that the date is always the true date of the last visit rather than the current time. 
        // on second thought, it might be working, but the mark seen is working too well.
        
        // And fix up each reply
        //
        _.each(thread.reply, function(reply) {
          if (typeof reply.me === 'undefined') {
            reply.me = {};
          }
          reply.me.seen = new Date(thread.me.seen);
          // TODO:: console.log(reply.me.seen);
          reply.lastUpdate = new Date(reply.modified);
          
          if (reply.me.seen < reply .lastUpdate) {
            thread.me.updates = true;
          }
        });
        $scope.thread = thread;
      });
      
      $http.post('/api/thread/' + $stateParams.forum + '/' + $stateParams.id + '/seen').success(function() {
        console.log('marked seen.');
      });
      
    };
    updateThread();
    
    var intervalPromise = $interval(function () {
      updateThread(); 
    }, 1000 * 60 * 2);
    $scope.$on('$destroy', function () {
      $interval.cancel(intervalPromise);
    });
    
    
  });
