import { storage, currentStorage, storageUsed, add} from "../code/red_underlines_corrected";

describe('Corrected behavior using TypeScript', function () {
  let results, expected;
  it('should run properly', function () {
    add({ weight: 3000 });
    results = [storage, currentStorage];
    expected = [{ max: 5000, items: [{ weight: 3000 }] }, 3000];
    expect(results).toEqual(expected);
  });
});