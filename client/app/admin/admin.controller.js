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
        
        $http.post('/api/invite/', {
          role: $scope.user.role,
          email: $scope.user.email
        }).success(function(data, status, headers, config) {
        
          $scope.invites = Invite.query();
        
        }).error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.error(data);
        });
        
        /*
        TODO: learn what this is
        Invite.save({
          role: $scope.user.role,
          email: $scope.user.email
        })
        .then( function() {
          console.log('invited');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};
        });
        */
      }
    };
    
  });
