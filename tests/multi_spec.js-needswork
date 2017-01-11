import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {Registry} from '../src/ReactDashboard';
import GAMetric from '../examples/components/GAMetric';
import GAMultiSelect from '../examples/components/GAMultiSelect';

const settings = {
      type: 'Multi',
      initialSelection: 'a',
      elements:{
						 a: [
              {
                type:'GAMetric',
                cardStyle: 'metric',
                background: '#9F3E69',
                metric: 'getRandomMetric',
                caption: 'A Jawn',
                iconClass: 'glyphicon glyphicon-user'
              }

						 ],
             b: [
              {
                type:'GAMetric',
                cardStyle: 'metric',
                background: '#9F3E69',
                metric: 'getRandomMetric',
                caption: 'B Jawn 1',
                iconClass: 'glyphicon glyphicon-user'
              },
              {
                type:'GAMetric',
                cardStyle: 'metric',
                background: 'cyan',
                metric: 'getRandomMetric',
                caption: 'B Jawn 2',
                iconClass: 'glyphicon glyphicon-tint'
              }
            ]
           }
          } 

describe('Multi component renders', () => {

  it('Initial state should be first element of settings', () => {
    let node = TestUtils.renderIntoDocument(React.createElement(Registry.get('GAMultiSelect'), settings));
    expect(node.state.elements[0].caption).toEqual('A Jawn');
    expect(node.state.elements.length).toBe(1);
  });
  
  it('Select change should update state.elements array', () => {
    let node = TestUtils.renderIntoDocument(React.createElement(Registry.get('GAMultiSelect'), settings));
    let input = TestUtils.findRenderedDOMComponentWithTag(node, 'select');
    input.value = 'b';
    TestUtils.Simulate.change(input);
    expect(node.state.elements.length).toBe(2);
  });
});
