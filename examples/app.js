import React, { Component } from 'react';
import {Dashboard} from '../src/ReactDashboard';
import Dataset from '../src/models/Dataset';


export default class GADashboard extends Dashboard {

  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  componentDidMount() {
    let dataset = new Dataset({
      backend: 'csv',
      url: 'http://demo.getdkan.com/node/9/download'
    });
    dataset.fetch().then(() => {
      dataset.query({size: 100, from: 0}).then((data) =>{
        this.setData({globalData: data.hits});
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
