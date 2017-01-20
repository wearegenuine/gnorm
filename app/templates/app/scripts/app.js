'use strict';

var $ = require('jquery');
var ComponentReveal = require('./modules/componentReveal/componentReveal.main');
var componentReveal = new ComponentReveal();
var moduleRegistry = require('./modules/');

moduleRegistry.init();
