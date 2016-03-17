import * as Lib from '../dist/bundle.js';

console.log('>>', Lib, Lib.Context);

describe('1+1', () => {
  let sum = 1+1;

  it('should be 2', () => {
    expect(2).toBe(2);
  });
});

describe('Stub for use Context example', () => {
  const Context = Lib.Context;
  it('Context should be an obj', () => {
    expect(typeof Lib.Context).toBe('function');
  });
});
