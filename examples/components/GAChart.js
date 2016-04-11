import React, { Component } from 'react';
import Registry from '../../src/utils/Registry';
import Chart from '../../src/components/Chart';

export default class GAChart extends Chart {
  getData(globalData) {
    return fetch('http://localhost:3004/data');
  }

  onData(data) {
    data.json().then((data) => this.setData(data))
  }
}

Registry.set('GAChart', GAChart);
