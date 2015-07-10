'use strict';

angular.module('plankApp')
  .controller('ForumThreadCtrlComp', function ($scope, $http, Auth, ThreadModal) {
    
    console.log('here ehre here');
    
    $scope.isCollapsed = false;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    
    $scope.$watch('thread', function(newValue, oldValue) {
      if (typeof $scope.thread !== 'undefined') {
        $scope.markdownHtml = marked($scope.thread.markdown);
      }
    });
    
    $scope.reply = ThreadModal.create.reply(function (event, args) {
      console.log('called back from create reply');
      console.log(this.results);
      
      // TODO:: check the results are valid.

      console.log($scope.thread);
      
      var forum = $scope.thread.topic;
      var threadId = $scope.thread._id;
      
      $http.post('/api/thread/' + forum + '/' + threadId + '/reply', {
        markdown: this.results.markdown
      }).success(function(data, status, headers, config) {
        
        var lastSeen;
        if (typeof $scope.threads !== 'undefined' && $scope.threads.length > 0 && typeof $scope.threads[0].created !== 'undefined') {
          lastSeen = new Date($scope.threads[0].created);
          lastSeen.setSeconds(lastSeen.getSeconds() + 1);
        } else {
          lastSeen = new Date();
          lastSeen.setSeconds(lastSeen.getSeconds() + 1);
        }
        lastSeen = lastSeen.getTime();
        
        $http.get('/api/thread/' + $stateParams.forum + '/?enddate=' + lastSeen).success(function(threads) {
          $scope.threads = threads.concat($scope.threads);
        });
        
        
      }).error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.error(data);
      });
    }, 'app/forum/modal/reply-create.modal.html');
    
    
  })
  .directive('forumThread', function() {
    return {
      restrict: 'E',
      scope: {
        thread: '='
      },
      templateUrl: 'components/thread/thread.html',
      controller: 'ForumThreadCtrlComp'
    };
  });
