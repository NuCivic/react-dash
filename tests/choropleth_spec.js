var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');

describe('Libs load', () => {
  console.log('m00', React, TestUtils);
  it('should be libs', () => {
    expect(typeof React).not.toBe('undefined');
    expect(typeof TestUtils).not.toBe('undefined');
  })
});

describe('2+2', () => {
  let sum = 2+2;

  it('should be 2', () => {
    expect(sum).toBe(4);
  });
});
