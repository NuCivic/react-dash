import React, { Component } from 'react';
import {Dashboard} from '../src/ReactDashboard';
import Dataset from '../src/models/Dataset';
import CSV from 'csv-es6-data-backend';
import DKAN from 'dkan-es6-data-backend';

Dataset.registerBackend('csv', CSV);
Dataset.registerBackend('dkan', DKAN);

// let dataset = new Dataset({
//   backend: 'dkan',
//   endpoint: 'https://data.ok.gov/api',
//   url: 'https://data.ok.gov/api/action/datastore/search.json?resource_id=59729bed-2dd4-4976-b06f-48def7df6ce3&limit=10&offset=0',
//   id: '59729bed-2dd4-4976-b06f-48def7df6ce3'
// });

let dataset = new Dataset({
  backend: 'csv',
  url: 'http://demo.getdkan.com/node/9/download'
});

dataset.fetch().then(() => {
  dataset.query({size: 100, from: 0, filters:[{type:'term', field: 'price', term:34.73}]}).then((data) => console.log(data) );
});

export default class GADashboard extends Dashboard {

  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  onAutocompleteChange(payload) {
    console.log(payload.value);
  }

}
