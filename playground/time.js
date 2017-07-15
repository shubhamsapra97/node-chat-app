const moment = require('moment');

var date = moment();
date.subtract(9,'months').add(100,'year');
console.log(date.format('MMM Do, YYYY'));

console.log(date.format('h:mm a'));

