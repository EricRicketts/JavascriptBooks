/* npm t exercises/numbers-math/is_odd_test.mjs
Instructions:
- Create the file is_odd.mjs
- Ensure the test passes
- Possibly useful: Math.abs()
*/
suite('is_odd_test.mjs');

import * as assert from 'assert/strict';

import {isOdd} from './is_odd.mjs';

test('isOdd', () => {
	assert.equal(isOdd(3), true);
	assert.equal(isOdd(-3), true);
	assert.equal(isOdd(10001), true);

	assert.equal(isOdd(0), false);
	assert.equal(isOdd(2), false);
	assert.equal(isOdd(-2), false);
	assert.equal(isOdd(10000), false);
});
