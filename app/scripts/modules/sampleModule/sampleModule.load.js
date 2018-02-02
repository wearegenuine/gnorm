module.exports = ($el) => {
  require.ensure([], (require) => {
    const Module = require('./sampleModule.main')
    new Module($el)
  })
}
