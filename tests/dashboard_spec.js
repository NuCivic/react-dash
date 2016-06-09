import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {Registry} from '../src/ReactDashboard';
import Dashboard from '../src/components/Dashboard';
import {settings} from '../examples/settings';
import DB from '../db.json';

let Settings = Object.assign(settings, {globalData: DB});

describe('Instantiate Dashboard component', () => {
  it('Component should render as React DOM node', () => {
    let node = new Dashboard(Settings);
    expect(typeof node.props).toBe('object');
  });
});

// @@TODO determine behaviors to test at dashboard level
