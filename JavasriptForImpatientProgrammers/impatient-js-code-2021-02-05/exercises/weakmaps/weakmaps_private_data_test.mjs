/* npm t exercises/weakmaps/weakmaps_private_data_test.mjs
Instructions:
- Change weakmaps_private_data.mjs: use WeakMaps for private data, not property names with underscores
- Make sure the tests still pass
*/
suite('weakmaps_private_data_test.mjs');

import * as assert from 'assert/strict';

import {StringBuilder} from './weakmaps_private_data.mjs';

test('Empty StringBuilder', () => {
    assert.equal(new StringBuilder().toString(), '');
});
test('Adding strings to a StringBuilder', () => {
    assert.equal(new StringBuilder().add('foo').add('bar').toString(), 'foobar');
});
test('Rule out singleton implementations', () => {
    const sb1 = new StringBuilder().add('sb1');
    const sb2 = new StringBuilder().add('sb2');
    
    assert.equal(sb1.toString(), 'sb1');
    assert.equal(sb2.toString(), 'sb2');
});
test('Is private data hidden?', () => {
    const sb = new StringBuilder();
    assert.deepEqual(Reflect.ownKeys(sb), []);
});

// Similar: exercises/proto-chains-classes/string_builder_symbol_test.mjs
