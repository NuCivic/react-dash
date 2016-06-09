import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {Registry} from '../src/ReactDashboard';
import Loader from '../src/components/Loader';
 
describe('Instantiate Loader component', () => {
  it('Component should render as React DOM node', () => {
    let node = new Loader();
    expect(typeof node).toBe('object');
  });
});

// @@TODO setState and check for loading class in DOM
