'use strict';

angular.module('plankApp')
  .controller('ForumThreadReplyCtrl', function ($scope, $location, Auth, marked) {
    $scope.isCollapsed = false;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    
    $scope.markdownHtml = marked($scope.reply.markdown);
    
    
  })
  .directive('forumThreadReply', function() {
    return {
      restrict: 'E',
      scope: {
        reply: '='
      },
      templateUrl: 'components/thread/thread-reply.html',
      controller: 'ForumThreadReplyCtrl'
    };
  });
