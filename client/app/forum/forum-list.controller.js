'use strict';

var autoUpdate = true; //false; // TODO:: TRUE for prod.

angular.module('plankApp')
  .controller('ForumCtrl', function (_, $scope, $stateParams, $http, $interval, ThreadModal, forumListService) {
    
    window.forumListService = forumListService;
    
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
      forumListService.getList(forum, function(threads) {
        $scope.threads = threads;
        $scope.loading = false;
      });
    };
    
    updateList();
    
    if (autoUpdate) {
      var intervalPromise = $interval(function () {
        updateList(); 
      }, 1000 * 60 * 1);
      $scope.$on('$destroy', function () {
        $interval.cancel(intervalPromise);
      });
    }
    
    
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
