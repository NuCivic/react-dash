import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {Registry} from '../src/ReactDashboard';
import Autocomplete from '../src/components/Autocomplete';
 
let settings = {
								type: 'Autocomplete',
								name: 'some-name',
								multi: true,
								options: [{ value: 'one', label: 'One' },{ value: 'two', label: 'Two' }]      
              };

describe('Instantiate Autocomplete component', () => {
  it('Component should render as React DOM node', () => {
    let node = TestUtils.renderIntoDocument(React.createElement(Registry.get('Autocomplete'), settings));
    expect(node.props.type).toBe('Autocomplete');
  });
});

// @@TODO
// * Add testUtils input to autocomplete and check DOM for update
