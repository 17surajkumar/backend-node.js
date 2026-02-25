const math = require("./math");  // math object
const { add, sub } = require("./math"); //destructuring

console.log("Math value is: ",math);

//accessing the value of the object
// console.log("adding: ", math.add(2, 4));
// console.log("subtracting: ", math.sub(2, 4));


console.log("Multiplying: ", math.mult(2, 4));
console.log("Division: ", math.div(2, 4));
