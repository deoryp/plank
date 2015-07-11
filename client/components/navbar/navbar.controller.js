'use strict';

var shrinkHeader_small = 50;
var shrinkHeader_large = 200;
var scale_factor = 1.3;

function getCurrentScroll() {
  return window.pageYOffset || document.documentElement.scrollTop;
}

function fixHeader() {
  var scroll = getCurrentScroll();
  if ( scroll >= shrinkHeader_large ) {
   $('nav').addClass('shrink');
   $('nav').height(shrinkHeader_small);
 
   $("#theforumheader").height(shrinkHeader_small);
   $("#theforumheader").width(shrinkHeader_small * scale_factor);
 
//   $("#demo_image").height(shrinkHeader_small);
//      $("#demo_image").width(shrinkHeader);
  }
  else {
    $('nav').height(shrinkHeader_small + shrinkHeader_large - scroll);
    $('nav').removeClass('shrink');
  
    $("#theforumheader").height(shrinkHeader_small + shrinkHeader_large - scroll);
    $("#theforumheader").width((shrinkHeader_small + shrinkHeader_large - scroll) * scale_factor);
  
//    $("#demo_image").height(shrinkHeader_small  + shrinkHeader_large - scroll);
//      $("#demo_image").width(shrinkHeader + shrinkHeader - scroll);
  
  }

  $("#theforumheader").slabText();

};

angular.module('plankApp')
  .controller('NavbarCtrl', function ($scope, $location, $timeout, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];
    
    console.log($scope.state());
    
    $(window).scroll(fixHeader);
    fixHeader();
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
    
  });