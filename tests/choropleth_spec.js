const React = require('react');
const TestUtils = require('react/lib/ReactTestUtils');
let Choro = require('../src/components/Choropleth.jsx');

describe('Libs load', () => {
  it('should be libs', () => {
    expect(typeof React).toBeTruthy();
    expect(typeof TestUtils).not.toBe('undefined');
  })
});

describe('Choropleth element should load', () => {
  it('Should be truthy', () => {
    expect(Choro).toBeTruthy();
  });
})
