const moment = require('moment');

// let date = new Date();
// console.log(date.getMonth());

let date = moment();

console.log(date.format());
date.add(1, 'years').subtract(2, 'months');
console.log(date.format('MMM Do, YYYY'));
console.log(date.format('h:mm a'));

let createdAt = 12345;
let date1 = moment(createdAt);
console.log(date1.format('MMM Do, YYYY'));
console.log(date1.format('h:mm a'));

console.log(moment().valueOf());