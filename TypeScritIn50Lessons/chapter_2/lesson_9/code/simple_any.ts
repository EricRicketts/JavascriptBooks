let deliveryAddress: any = '421 Smashing Hill, 90210';
deliveryAddress = 0.2;
// this is ok because the type is 'any' so any type can be assigned to variable deliveryAddress

let deliveryAddressTwo: string = 2; // easy problem to see type mismatch

let deliveryAddressThree = [
  '421 Smashing Hill, 90210',
  '221b Paw-ker Street',
  '4347 Whiskers-ia Lane'
];
// Type of deliveryAddressThree is a string by inference, this is called 'right-hand typing'

// A more explicit type of typing is left-hand typing
let deliveryAddressFour: string[] = [
  '421 Smashing Hill, 90210',
  '221b Paw-ker Street',
  '4347 Whiskers-ia Lane'
];

deliveryAddressFour.push('this is ok, another string');
deliveryAddressFour.push(2); // this raises a flag, the number 2 is a type mismatch with an array of strings

/*
  the any keyword in TypeScript is a backdoor to Javascript flexibility, but it can be used in a type cast to
  let the user know we want more flexibility in this case, example

  (theObject as any).firstLetter.toUpperCase();

  We can also set the noImplicitAny in the compiler (in tsconfig.json) to true this means that the developer must
  either explicitly declare types, assign types so that the types can be easily inferred or if a type is to be
  any then it must be explicitly assigned or cast:

  function printAddress(deliveryAddress) {
    console.log(deliveryAddress); // TypeScript would flag deliveryAddress with noImplicitAny set to true
                                  // it must be declared in the parameter list as any or cast as any in the
                                  // console.log
  }
*/