const dummy = require('../utils/list_helper')

test("dummy", () => {
    const result = dummy(new Array());

    expect(result).toBe(1);
})