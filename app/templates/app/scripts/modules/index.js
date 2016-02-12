'use strict';
var $ = require('jquery');

module.exports = {
  init: function() {
    $('[data-module]').each((i, v) => {
      var name = $(v).data('module');
      var module = this.modules[name]($(v));
    });
  },
  modules: {
    sampleModule: require('./sampleModule/sampleModule.load')
  }

};
