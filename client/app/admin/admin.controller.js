'use strict';

angular.module('plankApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, Invite) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();
    
    $scope.invites = Invite.query();

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
    
    $scope.user = {};
    $scope.errors = {};
    
    $scope.uninvite = function(invited) {
      Invite.remove({ id: invited._id });
      angular.forEach($scope.invites, function(u, i) {
        if (u === invited) {
          $scope.invites.splice(i, 1);
        }
      });
    };
    
    $scope.invite = function(form) {
      if(form.$valid) {
        console.log($scope.user.name);
        console.log($scope.user.email);
      }
    };
    
  });
