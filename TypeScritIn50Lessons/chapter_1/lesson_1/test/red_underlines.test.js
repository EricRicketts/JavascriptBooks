import { storage, currentStorage, storageUsed, add } from '../code/red_underlines';

describe('Silent failures in Javascript', function () {
  // the point of this test is to show that the code still ran despite the many
  // errors in the code
  let results, expected;
  it('should fail silently', function () {
    results = add({ weight: 3000 });
    expect(results).toBeUndefined();
  });

  it('storage still defined after errors in defineProperty method', function () {
    // no properties were added to property max, rather max was not redefined, because
    // Object.defineProperty was not used correctly, so Javasscript left the property unchanged.
    results = [storage.max, storage.items];
    expected = [undefined, []];
    expect(results).toEqual(expected);
  });
});