import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {Registry} from '../src/ReactDashboard';
import Layout from '../src/components/Layout';
 
describe('Instantiate Layout component', () => {
  it('Component should render as React DOM node', () => {
    let node = new Layout();
    expect(typeof node).toBe('object');
  });
});

// @@TODO Instatiate Layout component with settings & props
// @@TODO Determine test requirement for Layout component
