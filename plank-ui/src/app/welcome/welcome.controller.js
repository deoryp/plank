(function() {
  'use strict';

  angular
    .module('plankApp')
    .controller('WelcomeController', WelcomeController);

  /** @ngInject */
  function WelcomeController() {
    this.message = 'worked.';
  }
})();
