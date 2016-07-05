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
    componentReveal: require('./componentReveal/componentReveal.load'),
    sampleModule: require('./sampleModule/sampleModule.load')
  }

};
