//@ts-check
const storage = {
  max: undefined,
  items: []
}
// the big advantage of TypeScript is even before you run the code it does some kind of type check
// this is telling is { readonly: true } is not assignable to a PropertyDescriptor type
// Note when we change readonly to writable (and its boolean argument to false), TypeScript moves on
// and highlights the val property, there is no such allowed property in a PropertyDescriptor, it needs
// to be value.
Object.defineProperty(storage, 'max', { readonly: true, val: 5000 });

let currentStorage = 'undefined';

function storageUsed() {
  if (currentStorage) {
    return currentStorage;
  }
// There are problems created with the assignment in line 13, this is a string, which means the conditional
// evaluation in line 16 is true, not false, it needs to be given the primitive undefined
// the reason TypeScript throws an error is because we are mixing primitive values, even though undefined is a
// primitive, mixing strings and numbers is behavior we generally try to avoid.

// this is an important trait of TypeScript, type inference, the moment we assign a value to variable, TypeScript
// expects that variable to hold that kind of value.  Assigning undefined is ok because that tells Javascript
// it is neither a type or a value, that will be established once something other than undefined gets assigned
// to the variable.
  currentStorage = 0;
// semantic check: this loop will crash because i was initialized as a constant and constants cannot be reassigned.
  for (const i = 0; i < storage.length(); i++) {
    currentStorage += storage.items[i].weighth;
  }
// type inference works in methods, so currentStorage should return a number
  return currentStorage;
}

function add(item) {
// this is flaged because we are comparing a numeric result to a function which would be converted to a string.
  if (storage.max - item.weight >= storageUsed) {
// add does not exist as an array method, and the variable iten does not exist
    storage.items.add(item);
    currentStorage += iten.weight;
  }
}

export { storage, currentStorage, storageUsed, add };

