/* eslint-disable no-unused-vars */

module.exports = {
  init: function() {
    const dataModules = document.querySelectorAll('[data-module]')
    for (const dataModule of dataModules) {
      const name = dataModule.dataset.module
      const module = this.modules[name](dataModule)
    }
  },
  modules: {
    sampleModule: require('./sampleModule/sampleModule.load')
  }
}
