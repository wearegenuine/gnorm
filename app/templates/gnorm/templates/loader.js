'use strict';

module.exports = ($el) => {
  <% if ( typeof(async) !== 'undefined' ){ %>
  require.ensure([], (require) => {
  <% } %>
    var Module = require('./<%= name %>.main');
    new Module($el);
    <% if ( typeof(async) !== 'undefined' ){ %>
  });
  <% } %>
};
