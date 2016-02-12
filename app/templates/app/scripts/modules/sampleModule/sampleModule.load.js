'use strict';

module.exports = ($el) => {
  
  require.ensure([], (require) => {
  
    var Module = require('./sampleModule.main');
    new Module($el);
    
  });
  
};
