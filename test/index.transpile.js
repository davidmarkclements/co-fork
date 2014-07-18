var Traceur = require('traceur');

Traceur.require.makeDefault(function(filename) {  
  return !(/node_modules\/traceur/.test(filename));
});

require('./index')
