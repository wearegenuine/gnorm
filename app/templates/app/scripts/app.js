'use strict'

const $ = require('jquery')
const moduleRegistry = require('./modules/')
const ComponentReveal = require('./modules/componentReveal/componentReveal.main')

const componentReveal = new ComponentReveal()

moduleRegistry.init()
