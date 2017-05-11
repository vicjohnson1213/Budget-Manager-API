var _ = require('lodash'),
    
    base = require('./base'),
    dev = require('./development'),
    prod = require('./production'),

    config = {};

_.assign(config, base, (process.env.NODE_ENV === 'production' ? prod : dev));

module.exports = config;