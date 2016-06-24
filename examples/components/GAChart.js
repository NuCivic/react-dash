import React, { Component } from 'react';
import Registry from '../../src/utils/Registry';
import Chart from '../../src/components/Chart';
import CSV from 'csv-es6-data-backend';

export default class GAChart extends Chart {
  getCustomData(globalData) {
    return fetch('http://localhost:3004/data');
  }

  getTopChartData() {
    let records = this.props.globalData;
    records = records.map((record) => ({date: Date.parse(record.date), price: Number(record.price)}));
    return records;
  }
}

Registry.set('GAChart', GAChart);
