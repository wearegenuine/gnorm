'use strict';

var $ = require('jquery');

module.exports = class SampleModule{
  constructor($el){
    this.$el = $el;
    this.method(this.$el);
  }
  method($element){
    console.log($element);
  }
};
