
const add = require('./add');
const sub = require('./subtract');
const mul = require('./multiply');
const div = require('./divide');

let a = 200;
let b = 5;

console.log(`Addition: ${add(a,b)}`);

console.log(`Subtract: ${sub(a,b)}`);

console.log(`Multiply: ${mul(a,b)}`);

console.log(`Divide: ${div(a,b)}`);