import React, { Component } from 'react';
import Registry from '../../src/utils/Registry';
import Choropleth from '../../src/components/Choropleth';

// @@TODO get data import
import topodata from 'json!../../examples/data/us.json';
import domainData from 'dsv?delimiter=\t!../../examples/data/unemployment.tsv';

export default class GAChoropleth extends Choropleth {

  onData(data) {
    data.json().then((data) => this.setData(data))
  }

  getData() {
    return fetch('http://localhost:3004/data');
  }
}

Registry.set('GAChoropleth', GAChoropleth);
