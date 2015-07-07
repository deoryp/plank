'use strict';

angular.module('plankApp')
  .controller('ForumThreadPreviewCtrl', function ($scope, $location, Auth) {
    $scope.isCollapsed = false;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    
    // TODO:: trim down the thread
    
    $scope.view = function () {
      $location.path('/forum/' + $scope.thread.topic + '/' + $scope.thread.id);
    }
    $scope.markdownHtml = marked($scope.thread.markdown);
    
  })
  .directive('forumThreadPreview', function() {
    return {
      restrict: 'E',
      scope: {
        thread: '='
      },
      templateUrl: 'components/thread/thread-preview.html',
      controller: 'ForumThreadPreviewCtrl'
    };
  });
  
console.log('included forum thread')