'use strict';

angular.module('plankApp')
  .controller('MainCtrl', function ($scope, $http, $timeout) {
      
    $http.get('/api/users/me').success(function(user) {
      $scope.user = user;
    });

    $scope.topics = [
      {
        title: 'General',
        glyph: 'glyphicon glyphicon-blackboard',
        href: '/forum/general'
      },
      {
        title: 'Media',
        glyph: 'glyphicon glyphicon-headphones',
        href: '/forum/media'
      },
      {
        title: 'Events',
        glyph: 'glyphicon glyphicon-calendar',
        href: '/forum/events'
      }
    ];
    
    // TODO:: look into ui-sref= to target the state and the params without needing to knowing the url.
    
    $scope.$watch('topics', function() {
      $timeout(function() {
        $('.slab-topic').slabText();
      }, 200);
    });


  });
