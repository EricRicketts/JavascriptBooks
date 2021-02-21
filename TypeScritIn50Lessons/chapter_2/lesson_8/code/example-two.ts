function addVAT(price: number, vat: number = 0.2): number {
  return price * (1 + vat);
}

export { addVAT };
/*
Note the above code how we can annotate with TypeScript right in the
function definition.  The parameters type declarations are self-explanatory
But the ): number tells TypeScript the return value will be a number.
*/

/*
Original Code at the Beginning of the lesson

function addVAT(price, vat ) {
  return price * (1 + vat);
}

const vatPriceAlsoWrong = addVAT('Hi', 'friends!');
const vatPriceWrong = addVAT('this is so', 'wrong');


function addVAT(price, vat) {
  return price * (1 + vat);
}

const vatPrice = addVAT(30, 0.2); correct call both inputs are numbers
const vatPriceWrong = addVAT('this is so', 'wrong'); this is ok with Typescript
and type 'any' on the function parameters but it returns NaN, which is not useful to us

TypeScript can only warn above function is implicitly using type 'any' on its parameters

function addVAT(price, vat = 0.2) {
  return price * (1 + vat);
}

const vatPrice = addVat(30, 0.2); OK
const vatPrice = addVat(30); OK we have a default numeric value
const vatPriceErrors = addVat(30, 'a string'); Not OK, TypeScript expects a number
for the VAT value because it is set to a number.
const vatPriceAlsoWrong = addVAT('Hi', 'friends!'); Typescript still lets this run
even though a warning is given that the second argument is not a number
*/