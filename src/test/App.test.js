import { describe, it, expect } from 'vitest';

function double(x) {
  return x * 2;
}

describe('double', () => {
  it('should double the given number', () => {
    expect(double(2)).toBe(4);
  });
});
