'use strict';

angular.module('plankApp')
  .controller('ForumThreadCtrl', function ($scope, $stateParams, $http) {
      
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
    
    console.log('' + $stateParams.id );
    
    $http.get('/api/thread/' + $stateParams.forum + '/' + $stateParams.id).success(function(thread) {
      $scope.thread = thread;
    });
    
  });
