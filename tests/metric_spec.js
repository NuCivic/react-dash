import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {Registry} from '../src/ReactDashboard';
import Metric from '../examples/components/GAMetric';
 
let settings = {
                type:'GAMetric',
                key: '2a',
                cardStyle: 'metric',
                background: '#9F3E69',
                metric: 'getRandomMetric',
                caption: 'Get Multi',
                iconClass: 'glyphicon glyphicon-user'
							};

describe('Instantiate Metric component', () => {
  it('Component should render as React DOM node', () => {
    let node = TestUtils.renderIntoDocument(React.createElement(Registry.get('GAMetric'), settings));
    expect(node.props.type).toBe('GAMetric');
  });
});

// @@TODO
// * make sure that glyphicon is rendered into dom
// * make sure that metric is rendered as real value
