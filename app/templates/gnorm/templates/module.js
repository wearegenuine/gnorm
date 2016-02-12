'use strict';

var $ = require('jquery');

module.exports = class <%= constructor %>{
  constructor($el){
    this.$el = $el;
    this.method(this.$el);
  }
  method($element){
    console.log($element);
  }
};
