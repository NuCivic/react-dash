import React, { Component } from 'react';
import Registry from '../../src/utils/Registry';
import Chart from '../../src/components/Chart';

export default class GAChart extends Chart {
  getData1() {
    console.log('Chart get data');
    return fetch('http://localhost:3004/data');
  }
}

Registry.set('GAChart', GAChart);
