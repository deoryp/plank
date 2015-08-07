'use strict';

angular.module('plankApp')
  .controller('ForumCtrl', function (_, $scope, $stateParams, $http, $interval, ThreadModal) {
    
    $scope.threads = [];
    
    $scope.loading = true;
    
    $http.get('/api/users/me').success(function(user) {
      $scope.user = user;
    });
    
    // TODO:: this should come from the db at some point later.
    
    if ($stateParams.forum === 'general') {
      $scope.title = 'General';
    } else if ($stateParams.forum === 'media') {
      $scope.title = 'Media';
    } else if ($stateParams.forum === 'events') {
      $scope.title = 'Events';
    } else {
      console.error('invalid forum');
      return;
    }
    
    var forum = $scope.forum = $stateParams.forum;
    
    var updateList = function() {
      var lastSeen;
      if (typeof $scope.threads !== 'undefined' && $scope.threads.length > 0 && typeof $scope.threads[0].created !== 'undefined') {
        lastSeen = new Date($scope.threads[0].created);
        lastSeen.setSeconds(lastSeen.getSeconds() + 1);
      } else {
        lastSeen = new Date(0);
      }
      lastSeen = lastSeen.getTime();
    
      $http.get('/api/thread/' + $stateParams.forum + '/?enddate=' + lastSeen).success(function(threads) {
        $scope.threads = threads.concat($scope.threads);
        
        _.each($scope.threads, function(thread) {
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
        
        $scope.loading = false;
      });
      /*
      $http.get('/api/thread/' + $stateParams.forum + '/').success(function(threads) {
        $scope.threads = threads;
      });
      */
    };
    
    updateList();
    
    var intervalPromise = $interval(function () {
      updateList(); 
    }, 1000 * 60 * 1);
    $scope.$on('$destroy', function () {
      $interval.cancel(intervalPromise);
    });
    
    
    $scope.createNewThread = ThreadModal.create.thread(function (event, args) {
      // TODO:: check the results are valid.
      
      $http.post('/api/thread/' + forum + '/', {
        topic: forum,
        title: this.results.title,
        markdown: this.results.markdown
      }).success(function(data, status, headers, config) {
        
        updateList();
        
      }).error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.error(data);
      });
      
            
      
    }, 'app/forum/modal/thread-create.modal.html');
      
    
  });
