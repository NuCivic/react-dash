import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Choropleth from '../src/components/Choropleth.js';
import geo from './fixtures/zones.geojson';
import testData from './fixtures/zones_test_data.json';

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
  it('Fixture should load', () => {
    expect(typeof testData).toBe('object');
  });
});
