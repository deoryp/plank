'use strict';

angular.module('plankApp')
  .factory('forumListService', function (_, $http, $cacheFactory) {
    
    var getForumList = function(forum, callback) {
      var lastSeen = new Date(0);
      lastSeen = lastSeen.getTime();
    
      $http.get('/api/thread/' + forum + '/?enddate=' + lastSeen).success(function(threads) {
        _.each(threads, function(thread) {
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
        });
        callback(threads);
      });
    };
    
    var updateForumList = function(threads, forum, callback) {
      // TODO update the list but be careful about dups.
    };
    
    var forumCache = $cacheFactory('forums');
    
    return {
      getList: function(forum, callback) {
        var threads = forumCache.get(forum);
        if (typeof threads === 'undefined') {
          getForumList(forum, function(threads) {
            forumCache.put(forum, threads);
            callback(threads);
          });
        } else {
          // updateForumList(forumList, forum); // TODO be a bit better about the update. 
          callback(threads);
          // update
          getForumList(forum, function(threads) {
            forumCache.put(forum, threads);
            callback(threads);
          });
        }
      }
    };
    
  });
