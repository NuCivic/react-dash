import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Adaptor from '../src/adaptors';

const Lib = new Adaptor;

describe('Adaptors class should load', () => {
  it('Is a lib', () => {
    expect(typeof Lib.lookup).toEqual('function');
  })
});

describe('Lookup should return a valid function identifier', () => {
  it('Pie chart lookup success', () => {
    const func = Lib.lookup({lib: 'nvd3', type: 'pieChart'});
    expect(typeof func).toEqual('function');
  });
});
