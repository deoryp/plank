'use strict';

angular.module('plankApp')
  .controller('TimestampCtrlComp', function ($scope) {
    $scope.time = new Date($scope.time);
  })
  .directive('timestamp', function() {
    return {
      restrict: 'E',
      scope: {
        time: '='
      },
      templateUrl: 'components/timestamp/timestamp.html',
      controller: 'TimestampCtrlComp'
    };
  });
