const moment = require('moment');

exports.dateToString = date => new Date(date).toISOString();

// will need to trim time after date