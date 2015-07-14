'use strict';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

angular.module('plankApp')
  .factory('$', function get$() {
    return $;
  }).factory('marked', function getMarked() {
    return marked;
  }).factory('toMarkdown', function getToMarkdown() {
    return toMarkdown;
  });
