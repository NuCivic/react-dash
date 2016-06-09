import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {Registry} from '../src/ReactDashboard';
import {timeFormat as d3_timeFormat} from 'd3-time-format';
import Chart from '../examples/components/GAChart';
import DB from '../db.json';
 
let settings = 
      {
				globalData: DB.data,
        header:'Top',
        type: 'GAChart',
        iconClass: 'glyphicon glyphicon-tree-conifer',
        settings: {
          id:'lineChart2',
          type: 'lineChart',
          x: 'date',
          y: 'price',
          height: 340,
          margin: {
            left: 38
          },
          color: ['#EA7E7E'],
          xAxis: {
            tickFormat: d3_timeFormat('%Y')
          }
        },
        cardStyle: 'card',
        fetchData: {type:'function', name: 'getTopChartData'},

      };

describe('Instantiate Chart component', () => {
  it('Component should render as React DOM node', () => {
    let node = TestUtils.renderIntoDocument(React.createElement(Registry.get('GAChart'), settings));
    expect(node.props.settings.id).toBe('lineChart2');
  });
});

// @@TODO Sanity check chart in DOM 
