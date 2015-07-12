'use strict';

angular.module('plankApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window) {
    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
