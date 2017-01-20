'use strict';

module.exports = ($el) => {

  require.ensure([], (require) => {

    var Module = require('./componentReveal.main');
    new Module($el);

  });

};
