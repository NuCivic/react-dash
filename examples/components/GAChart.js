import React, { Component } from 'react';
import Registry from '../../src/utils/Registry';
import Chart from '../../src/components/Chart';
import CSV from 'csv-es6-data-backend';

export default class GAChart extends Chart {
  getData(globalData) {
    return fetch('http://localhost:3004/data');
  }

  getTopChartData() {
    return new Promise(function(resolve, reject) {
      CSV.fetch({url:'http://demo.getdkan.com/node/9/download'})
      .then((data) => {
        let records = data.records.map((record) => ({date: Date.parse(record.date), price: Number(record.price)}))
        resolve([{
          key: 'Gold evolution',
          values: records
        }]);
      });
    });
  }
}

Registry.set('GAChart', GAChart);
