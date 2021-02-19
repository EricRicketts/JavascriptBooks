/**
 * Adding two numbers.  This annotation tells TypeScript
 * which types to expect.  Two parameters of type number
 * and return a type number.
 *
 * @param {number} numberOne
 * @param {number} numberTwo
 * @returns {number}
 */
function addNumbers(numberOne, numberTwo) {
  return numberOne + numberTwo;
}

addNumbers(3, '2');
addNumbers(3, 2).toUpperCase();
