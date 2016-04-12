import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Choropleth from '../src/components/Choropleth.js';

describe('Libs load', () => {
  it('should be libs', () => {
    expect(typeof React).toBeTruthy();
    expect(typeof TestUtils).not.toBe('undefined');
  })
});

describe('Choropleth element should load', () => {
  it('Should be truthy', () => {
    expect(Choropleth).toBeTruthy();
  });
});

describe('Test geojson implementation', () => {
  const gConf =
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
          tooltip: [
            {
              label: 'Accred',
              attr: 'Accred. Time: Before 8 AM #'
            }
          ],
          mapDataUrl: '/data/zones.geojson',
          mapFormat: 'geojson',
          showGraticule: false,
          gridWidth: 600,
          projection: 'conicConformal' // https://github.com/mbostock/d3/wiki/Geo-Projections
        },
        cardStyle: 'card',
        fetchData: 'getData'
      }

		// Initialize component
		let testCh = new Choropleth(gConf);
		
    it('component should instantiate', () => {
      console.log('testCh', testCh);
      expect(testCh).toBeTruthy();
      expect(typeof testCh.legendSeries).toBe('function');
    });

});
