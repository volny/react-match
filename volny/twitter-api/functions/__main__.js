/**
* A basic Hello World function
* @param {string} name
* @param {number} age
* @returns {string}
*/
module.exports = (name = 'world', age, context, callback) => {

  callback(null, `hello ${name}, ${age}`);

};
