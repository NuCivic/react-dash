import React, { Component } from 'react';
import Registry from '../../src/Registry';
import Metric from '../../src/Metric';


export default class GAMetric extends Metric {

  getRandomMetric() {
    return Math.floor(Math.random() * 100) ;
  }

}

Registry.set('GAMetric', GAMetric);