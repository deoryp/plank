'use strict';

angular.module('plankApp')
  .factory('ThreadModal', function ($rootScope, $modal, $timeout) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $modal.open() returns
     */
    function openModal($scope, modalClass, modalTemplate) {
      var modalScope = $rootScope.$new();
      $scope = $scope || {};
      modalTemplate = modalTemplate || 'app/forum/modal/modal.html';
      modalClass = modalClass || 'modal-default';
      
      angular.extend(modalScope, $scope);
      
      return $modal.open({
        templateUrl: modalTemplate,
        windowClass: modalClass,
        size: 'lg',
        scope: modalScope
      });
    }

    // Public API here
    return {
      
      create: {
        /**
         * Create a function to open a create confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        thread: function(callback, template) {
          callback = callback || angular.noop;
          template = template || 'app/forum/modal/modal.html';

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed staight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments);
            var topic = args.shift();
            var title = '';
            var markdown = '';
            var threadModal = openModal({
              title: title,
              markdown: markdown,
              modal: {
                dismissable: false,
                title: 'Post to ' + topic,
                templateUrl: template,
                buttons: [{
                  classes: 'btn-create',
                  text: 'Post',
                  click: function(e) {
                    title = $('#title-modal').val();
                    markdown = $('#markdown-modal').val();
                    threadModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    threadModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-default');

            $timeout(function() {
              $('#markdown-modal').markdown();
            }, 100);

            threadModal.result.then(function(event) {
              event.results = {
                topic: topic,
                title: title,
                markdown: markdown
              };
              callback.apply(event, args);
            });
          };
        },
        reply: function() {
          
        }
      },
      /* Confirmation modals */
      confirm: {

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        delete: function(del) {
          del = del || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed staight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
                name = args.shift(),
                deleteModal;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirm Delete',
                html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Delete',
                  click: function(e) {
                    deleteModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    deleteModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger');

            deleteModal.result.then(function(event) {
              del.apply(event, args);
            });
          };
        }
      }
    };
  });
