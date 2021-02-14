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
  currentStorage = 0;
  for (const i = 0; i < storage.length(); i++) {
    currentStorage += storage.items[i].weighth;
  }
  return currentStorage;
}

function add(item) {
  if (storage.max - item.weight >= storageUsed) {
    storage.items.add(item);
    currentStorage += iten.weight;
  }
}

export { storage, currentStorage, storageUsed, add };

