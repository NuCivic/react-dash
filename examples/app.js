import React, { Component } from 'react';
import {Dashboard} from '../src/ReactDashboard';
import Dataset from '../src/models/Dataset';
import customDataHandlers from './customDataHandlers';

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
        const idParams = payload.id.split('-'); // get autocomplete type and target from id
        const target = idParams[0];
        const type = idParams[1];
        const value = payload.value.value;
        console.log('AUTOCOMPLETE_CHANGE', idParams, type, target, value);
        if (type === 'multi') {
          this.updateMulti(target, value);
        }
        break;
    }
  }

  updateMulti(target, value) {
    
  } 
}
