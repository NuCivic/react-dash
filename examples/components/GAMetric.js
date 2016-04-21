import React, { Component } from 'react';
import Registry from '../../src/utils/Registry';
import Metric from '../../src/components/Metric';
import Dataset from '../../src/models/Dataset';

export default class GAMetric extends Metric {

  getRandomMetric() {
    return 100;
  }

  getCustomData() {
    // An example about how to use data from a remote resource
    return new Promise((resolve, reject) => {
      let dataset = new Dataset({
        backend: 'csv',
        url: 'http://demo.getdkan.com/node/9/download'
      });
      dataset.fetch().then(() => {
        dataset.query({size: 100, from: 0}).then((data) =>{
          resolve(data.hits);
        });
      });
    });
  }

  getAVGPrice(data) {
    // You can use either the local component data or the globalData
    // provided by the dashboard.
    // let price = this.getData().reduce(function(a,m,i,p) {
    //   return a + m.price/p.length;
    // }, 0);
    let price = this.getGlobalData().reduce(function(a,m,i,p) {
      return a + m.price/p.length;
    }, 0);
    return price.toFixed(2);
  }

}

Registry.set('GAMetric', GAMetric);