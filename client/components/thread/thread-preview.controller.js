'use strict';

angular.module('plankApp')
  .controller('ForumThreadPreviewCtrl', function ($scope, $location, Auth) {
    $scope.isCollapsed = false;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.view = function () {
      $location.path('/forum/' + $scope.thread.topic + '/' + $scope.thread._id);
    }
  })
  .directive('forumThreadPreview', function() {
    return {
      restrict: 'E',
      scope: {
        thread: '='
      },
      templateUrl: 'components/thread/thread-preview-small.html',
      controller: 'ForumThreadPreviewCtrl'
    };
  });
