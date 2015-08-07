'use strict';

angular.module('plankApp')
  .controller('FooterCtrl', function ($scope, $location, version) {
    $scope.version = version;
  });