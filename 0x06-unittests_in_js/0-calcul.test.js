const assert = require('assert');
const calculateNumber = require('./0-calcul');

describe('calculateNumber', () => {
  it('handles floating point whole numbers correctly', () => {
    assert.strictEqual(calculateNumber(1.0, 2.0), 3);
  });

  it('rounds down when b has fractional part less than 0.5', () => {
    assert.strictEqual(calculateNumber(1.0, 2.4), 3);
  });

  it('rounds down both numbers when they have fractional parts less than 0.5', () => {
    assert.strictEqual(calculateNumber(1.4, 2.4), 3);
  });

  it('rounds down when a has fractional part less than 0.5', () => {
    assert.strictEqual(calculateNumber(1.4, 2.0), 3);
  });

  it('rounds up when b has fractional part equal or greater than 0.5', () => {
    assert.strictEqual(calculateNumber(1.0, 2.5), 4);
  });

  it('rounds up both numbers when they have fractional parts equal or greater than 0.5', () => {
    assert.strictEqual(calculateNumber(2.6, 2.5), 6);
  });

  it('rounds up when a has fractional part equal or greater than 0.5', () => {
    assert.strictEqual(calculateNumber(2.6, 2.0), 5);
  });

  it('handles floating point numbers with trailing 9s correctly', () => {
    assert.strictEqual(calculateNumber(2.499999, 3.499999), 5);
  });
});
