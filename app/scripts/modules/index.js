'use strict'
const $ = require('jquery')

module.exports = {
  init: function() {
    $('[data-module]').each((i, v) => {
      let name = $(v).data('module')
      let module = this.modules[name]($(v))
    })
  },
  modules: {
    sampleModule: require('./sampleModule/sampleModule.load')
  }
}
