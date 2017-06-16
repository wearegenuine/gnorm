'use strict'

const $ = require('jquery')
const ComponentReveal = require('./modules/componentReveal/componentReveal.main')
const moduleRegistry = require('./modules/')

const componentReveal = new ComponentReveal()

moduleRegistry.init()
