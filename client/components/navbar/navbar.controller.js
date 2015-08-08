'use strict';

var shrinkHeader_small = 50;
var shrinkHeader_large = 170;
var scale_factor = 1.3;

function getCurrentScroll() {
  return window.pageYOffset || document.documentElement.scrollTop;
}

function fixHeader($, forceShrink) {
  var scroll = getCurrentScroll();
  
  // TODO:: use enabled here to fix up the squishy
  // TODO:: shink the THE FORUM just a little so it does not look like poop on mobile.
  
  if (forceShrink || scroll >= shrinkHeader_large ) {
   $('nav.theforumheader').addClass('shrink');
   $('nav.theforumheader').height(shrinkHeader_small);
 
   $("#theforumheader").height(shrinkHeader_small);
   $("#theforumheader").width(shrinkHeader_small * scale_factor);
  } else {
    $('nav.theforumheader').height(shrinkHeader_small + shrinkHeader_large - scroll);
    $('nav.theforumheader').removeClass('shrink');
  
    $("#theforumheader").height(shrinkHeader_small + shrinkHeader_large - scroll);
    $("#theforumheader").width((shrinkHeader_small + shrinkHeader_large - scroll) * scale_factor);
  }
  $("#theforumheader").slabText();
};

angular.module('plankApp')
  .controller('NavbarCtrl', function ($, $scope, $location, $timeout, Auth) {
    $scope.isCollapsed = true;
    
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];
    
    if ($scope.state() === 'main') {
      $scope.squishy = true;
      $('body').addClass('squishy');
    } else {
      $scope.squishy = false;
      $('body').removeClass('squishy');
    }
    
    var forceShrink = function() {
      if (!$scope.isCollapsed) {
        return true;
      } else if (!$scope.squishy) {
        return true;
      } else {
        return false;
      }
    };
    
    $(window).scroll(function() {
      fixHeader($, forceShrink());
    });
    fixHeader($, forceShrink());
    
    $scope.$watch('isCollapsed', function() {
      fixHeader($, forceShrink());
    });
    
    $scope.$watch('squishy', function() {
      fixHeader($, forceShrink());
    });
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
    
  });