console.log('gaCh');
import React, { Component } from 'react';
import Registry from '../../src/utils/Registry';
import Choropleth from '../../src/components/Choropleth';

// Stub for data call
import topodata from 'json!../../examples/data/us.json';
import domainData from 'dsv?delimiter=\t!../../examples/data/unemployment.tsv';

export default class GAChoropleth extends Choropleth {
  getCustomData() {
    console.log('gaCh getData');
    return {
      topodata: topodata,
      domainData: domainData
    }
  }
}

Registry.set('GAChoropleth', GAChoropleth);
