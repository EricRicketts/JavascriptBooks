import * as assert from 'assert/strict';

test('const', () => {
    const x = 3;
    assert.equal(x, 3);
    {
        const x = 12;
        assert.equal(x, 12);
    }
    assert.equal(x, 3);
});
