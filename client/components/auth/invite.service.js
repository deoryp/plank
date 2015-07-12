'use strict';

angular.module('plankApp')
  .factory('Invite', function ($resource) {
    return $resource('/api/invite/:id', {
      id: '@_id'
    },
    {
      get: {
        method: 'GET',
        params: {
        }
      }
	  });
  });
