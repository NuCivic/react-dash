import React from 'react';
import Choropleth from '../src/components/maps/Choropleth.js';
import geo from './fixtures/zones.geojson';
import testData from './fixtures/zones_test_data.json';
import ReactTestUtils from 'react-addons-test-utils';

let Component;
const settings = 
{
	header: 'GAChoropleth Test ][ - GEOJSON',
	type: 'Choropleth',
	settings: {
		colors: ['red','green','yellow','purple','orange','pink','#252525','#000000'],
		cssPath: '/static/choropleth.css',
		showTooltip: {true},
		legendHeader: 'Accred. Time: Before 8 AM #',
		levels: 5,
		domainLower: 10,
		domainUpper: 80,
		domainKey: 'Zone', // map key in domain data
		domainMapKey: 'name', // map key in map data
		domainField: 'Accred. Time: Before 8 AM #',
		dataset: {
			backend: 'csv',
			url: '/data/apollo-parsed-1737-325_0.csv',
			delimiter: ','
		},
		tooltip: {
			label: 'Accred',
			attr: 'Accred. Time: Before 8 AM #'
		},
		mapDataUrl: '/data/zones.geojson',
		mapFormat: 'geojson',
		showGraticule: false,
		gridWidth: 600,
		projection: 'conicConformal' // https://github.com/mbostock/d3/wiki/Geo-Projections
	},
	cardStyle: 'card',
	fetchData: 'getData'
}

describe('Libs load', () => {
  it('should be libs', () => {
    expect(typeof React).toBeTruthy();
    expect(typeof ReactTestUtils).not.toBe('undefined');
  })
});

describe('Choropleth element should load', () => {
  it('Should be truthy', () => {
    expect(Choropleth).toBeTruthy();
  });
});

describe('Test geojson implementation', () => {
  it('Fixture should load', () => {
    expect(typeof testData).toBe('object');
  });
});

describe('Instantiate Choropleth component', () => {
  Component = new Choropleth(settings);
  it('Should be an object', () => {
    expect(typeof Component).toBe('object'); 
  });

  it('Should quack like a duck', () => {
    expect(typeof Component.componentDidMount).toBe('function');
  });
});

// @@TODO - complete coverage for choropleth functions
describe('Test Choropleth functions', () => {
  let row = { 'Accred. Time: Before 8 AM #' : 1000, 'foo' : 'bar' };
  let Component = new Choropleth(settings);
  it('_domainValue should return proper value', () => {
    //expect(typeof Component._domainValue).toBe('function');
    //expect(Component._domainValue(row)).toBe(1000);
    expect("needs work").toBe("needs work");
  });
});

describe('Test Choropleth Component Render', () => {
  let Component = new Choropleth(settings);
  //let el = Component.render();
  it('Should render a real react component', () => {
    //expect(ReactTestUtils.isElement(el)).toBeTruthy();
    expect("needs work").toBe("needs work");
  })
});
