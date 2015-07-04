'use strict';

angular.module('plankApp')
  .controller('ForumThreadCtrlComp', function ($scope, Auth) {
    
    console.log('here ehre here');
    
    $scope.isCollapsed = false;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    
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
  
console.log('included forum thread')