import { addVAT } from "../code/example-two";

describe('Run a TypeScript Function', function () {
  it('should run the default', function () {
    expect(addVAT(100)).toBe(120);
  });

  it('should run with the second argument', function () {
    expect(addVAT(100, 0.5)).toBe(150);
  });
});