import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {Registry, GAMetric} from '../src/ReactDashboard';

const settings = {
      type: 'Multi',
      elements:{
						 a: [
              {
                type:'Metric',
                cardStyle: 'metric',
                background: '#9F3E69',
                metric: 'getRandomMetric',
                caption: 'A Jawn',
                iconClass: 'glyphicon glyphicon-user'
              }

						 ],
             b: [
              {
                type:'Metric',
                cardStyle: 'metric',
                background: '#9F3E69',
                metric: 'getRandomMetric',
                caption: 'B Jawn 1',
                iconClass: 'glyphicon glyphicon-user'
              },
              {
                type:'Metric',
                cardStyle: 'metric',
                background: 'cyan',
                metric: 'getRandomMetric',
                caption: 'B Jawn 2',
                iconClass: 'glyphicon glyphicon-tint'
              }
            ]
           }
          } 

console.log(settings);

describe('3+1', () => {
  let sum = 3+1;

  it('should be 4', () => {
    expect(sum).toBe(4);
  });
});

describe('Multi component renders', () => {
  let node = TestUtils.renderIntoDocument(React.createElement(Registry.get('Multi'), settings));
  console.log(node.state.elements);
  it('Initial state should be first element of settings', () => {
    expect(node.state.elements[0].caption).toEqual('A Jawn');
  });
});
