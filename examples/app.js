import React, { Component } from 'react';
import {Dashboard} from '../src/ReactDashboard';
import Dataset from '../src/models/Dataset';

export default class GADashboard extends Dashboard {

  componentDidMount() {
    let dataset = new Dataset({
      backend: 'csv',
      url: 'http://demo.getdkan.com/node/9/download'
    });
    dataset.fetch().then(() => {
      dataset.query({size: 100, from: 0}).then((data) =>{
        this.setState({data: data.hits});
      });
    });
  }
  onAction(payload) {
    switch(payload.actionType) {
      case 'AUTOCOMPLETE_CHANGE':
        console.log('AUTOCOMPLETE_CHANGE');
        break;
    }
  }

}
