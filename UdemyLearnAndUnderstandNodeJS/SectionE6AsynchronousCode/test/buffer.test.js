describe('E6 Buffers', function () {
  let buffer, results, expected;
  beforeEach(() => {
    buffer = Buffer.alloc(5);
  });
  it('should have a fixed size of 5 bytes', function () {
    expect(buffer.length).toBe(5);
  });

  it('allow for write operations', function () {
    buffer.write('abcde', 'utf8');
    results = Array.from(buffer.values()).map(value => String.fromCodePoint(value));
    expected = ['a', 'b', 'c', 'd', 'e'];
    expect(results).toEqual(expected);
  });
});