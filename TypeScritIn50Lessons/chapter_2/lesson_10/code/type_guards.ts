let deliveryAddressFive: string[] = [];
function selectDeliveryAddress(addressOrIndex: any) {
  if (typeof addressOrIndex === 'number') {
    return deliveryAddressFive[addressOrIndex];
  }
  return addressOrIndex;
}

/*
TypeScript comments in the above code:

1.  Type guards: run time checks on the types to make sure we
are not dealing with mismatched types.
2.  Control Flow Analysis: Analyze the flow of control in your
program to be sure you are working with right types for the
next steps.
3.  Narrowing down: go from any to number
*/

// Problems with any
let deliveryAddressSix: string[] = [];
function selectDeliveryAddressTwo(addressOrIndex: any): string {
  if (typeof addressOrIndex === 'number' &&
      addressOrIndex < deliveryAddressSix.length) {
    return deliveryAddressSix[addressOrIndex];
  }
  return addressOrIndex; // acceptable with any
}

const myFavoriteAddress = selectDeliveryAddressTwo(true); // ok with any not what we want
// we want a string but we get a boolean instead, the general rule of thumb is to avoid any at all costs

// enter unknown is also at the top of the type system like any but it forces the developer in this
// case to design the control flow to ensure proper type safety
let deliveryAddressSeven: string[] = [];
function selectDeliveryAddressThree(addressOrIndex: unknown): string {
  if (typeof addressOrIndex === 'number' &&
    addressOrIndex < deliveryAddressSeven.length) {
    return deliveryAddressSeven[addressOrIndex];
  }
  return addressOrIndex; // not acceptable with unknown, type 'unknown' is not assignable to type string
  // so in the above case we are not guaranteed a string return type
}

let deliveryAddressEight: string[] = [];
function selectDeliveryAddressFour(addressOrIndex: unknown): string {
  if (typeof addressOrIndex === 'number' &&
    addressOrIndex < deliveryAddressEight.length) {
    return deliveryAddressEight[addressOrIndex];
  } else if (typeof addressOrIndex === 'string') {
    return addressOrIndex;
  }
  return ''; // in this case unknown has forced us to design the control path to always return a string
}
