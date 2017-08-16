'use strict'

module.exports = ($el) => {

  require.ensure([], (require) => {

    const Module = require('./componentReveal.main')
    new Module($el)

  })

}
