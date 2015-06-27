(function() {
  'use strict';

  describe('controllers', function(){

    beforeEach(module('plankApp'));

    it('should load', inject(function($controller) {
      var vm = $controller('WelcomeController');

      expect(vm.message !== null).toBeTruthy();
    }));
  });
})();
