import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {Registry} from '../src/ReactDashboard';
import Goal from '../examples/components/GAGoal';
 
let settings = 
      {
        type: 'GAGoal',
        title: '',
        caption: 'number of schools enrollments',
        link: 'http://tootherplace.com',
        icon: 'glyphicon-leaf',
        startDate: '03/24/2016',
        endDate: '04/24/2016',
        startNumber: 0,
        endNumber: 200,
        showEndNumber: false,
        action: 'maintain_above',
        background: 'white',
        captionTemplates: {
          maintain_above: 'yo quiero mi template',
        },
        // trackStatus: 'function',
        tolerance: [
          {from: 0, to: 2, label: 'On Track', color: 'green'},
          {from: 2, to: 5, label: 'Needs Improvement', color: 'orange'},
          {from: 5, to: Infinity, label: 'Off Track', color: 'red'},
        ],
        spline: {
          height: 50,
        },
        fetchData: {type:'function', name: 'getCustomData'},
        metric: 'getRandomMetric'
      };

describe('Instantiate Goal component', () => {
  it('Component should render as React DOM node', () => {
    let node = TestUtils.renderIntoDocument(React.createElement(Registry.get('GAGoal'), settings));
    expect(node.props.type).toBe('GAGoal');
  });
});

// @@TODO test getMetric
// @@TODO test getTolerance
// @@TODO test getTracker
// @@TODO test getCaption
// @@TODO test sane element in DOM
// * test expected behaviors
