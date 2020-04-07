const moment = require('moment');

exports.dateToString = date => new Date(date).toISOString().slice(0,10);

// will need to trim time after date