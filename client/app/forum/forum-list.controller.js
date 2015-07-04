'use strict';

angular.module('plankApp')
  .controller('ForumCtrl', function ($scope, $stateParams, $http) {
      
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
    }
    
    $scope.threads = [
      {
        id: '1',
        topic: 'general',
        date: 'July 4, 2015',
        title: 'It worked.',
        me: {
          updates: true, 
          comments: 1
        },
        author: {
          handle: 'Scottie',
          photo: 'https://lh3.googleusercontent.com/-_YyQXXslczM/AAAAAAAAAAI/AAAAAAAAAa0/mQPt6bjybwg/photo.jpg'
        },
        markup: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.'
      }, {
        id: '2',
        topic: 'general',
        date: 'July 7, 2015',
        title: '2 It worked.',
        me: {
          updates: false, 
          comments: 0
        },
        author: {
          handle: 'Demo',
          photo: 'http://.it/64x64'
        },
        markup: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.'
      }
    ];
    
  });
