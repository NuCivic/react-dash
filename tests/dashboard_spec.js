import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {Registry} from '../src/ReactDashboard';
import GADashboard from '../examples/app';
import {settings} from '../examples/settings';
import MyCustomLayout from '../examples/layouts/MyCustomLayout';
import DB from '../db.json';

let Settings = Object.assign(settings, {globalData: DB});

describe('Instantiate Dashboard component', () => {
  it('Component should render as React DOM node', () => {
    expect(TestUtils.isElement(<GADashboard {...settings} layout={MyCustomLayout} />)).toBeTruthy();
  });
});

// @@TODO determine behaviors to test at dashboard level
