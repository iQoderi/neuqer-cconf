const Cconf = require('./cconf');

Cconf.registerFormat('json', {
    parse: JSON.parse,
});

module.exports = Cconf;
