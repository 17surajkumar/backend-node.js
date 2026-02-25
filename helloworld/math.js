function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

// making math a module of objects
// Default object
// module.exports can be use only one times whereas 
// export." " can be used at any number of times

// module.exports = {
//   add,
//   sub,
// };


// these function are anonymous as these function not have names
exports.mult = (a, b) => a * b;
exports.div = (a, b) => a / b;
