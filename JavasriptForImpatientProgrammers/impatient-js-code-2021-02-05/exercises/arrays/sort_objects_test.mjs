/* npm t exercises/arrays/sort_objects_test.mjs
Instructions:
- Create the file sort_objects.mjs
- Ensure this test passes
*/
suite('sort_objects_test.mjs');

import * as assert from 'assert/strict';

import {sortObjectsByName} from './sort_objects.mjs';

test('sortObjectsByName', () => {
	assert.deepEqual(
        sortObjectsByName([
            {name: 'C'},
            {name: 'b'},
            {name: 'Ä'},
            {name: 'd'},
        ]),
        [
            {name: 'Ä'},
            {name: 'b'},
            {name: 'C'},
            {name: 'd'},
        ]
    );
});
