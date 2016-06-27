import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Adaptor from '../src/adaptors';
import {Registry} from '../src/ReactDashboard';

const Lib = new Adaptor;
const settings = {
    header:'Top',
    type: 'Chart',
		lib: 'nvd3',
//		funcType: 'lineChart',
    settings: {
      id:'lineChart2',
      type: 'lineChart',
      x: 'x',
      y: 'y',
      height: 340,
      color: ['#EA7E7E'],
    },
    cardStyle: 'card',
    fetchData: {type:'function', name: 'getCustomData'},
}
const Chart = Registry.get('Chart');

class MyChart extends Chart {
   getCustomData() {
    return [{x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}];
   }
}

describe('Adaptors class should load', () => {
  it('Has lookup function', () => {
    expect(typeof Lib.lookup).toEqual('function');
  })
});

describe('Lookup should return a valid function identifier', () => {
  it('Pie chart lookup success', () => {
    const func = Lib.lookup({lib: 'nvd3', type: 'pieChart'});
    expect(typeof func).toEqual('function');
  });
});

describe('Adaptor should update data format', () => {
  const shallowRenderer = TestUtils.createRenderer();
  let ChartInstance = React.createElement(MyChart, settings);
  
  shallowRenderer.render(ChartInstance);
  const component = shallowRenderer.getRenderOutput();
  let Chart1 = new MyChart(settings);
  Chart1.fetchData();
  setTimeout(function () {
    console.log('CHCHCH', JSON.stringify(Chart1.state));
  }, 600);
  console.log('CC>>', JSON.stringify(component));
  it('Should have getCustomData method', () => {
    expect(typeof ChartInstance.getCustomData).toEqual('function');
	}); 

  it('Data should be adapted to nvd3 -> lineChart format', () => {
    expect(ChartInstance.state.data.values[2].x).toEqual('3');   
  });
});
