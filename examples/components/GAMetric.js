import React, { Component } from 'react';
import Registry from '../../src/utils/Registry';
import Metric from '../../src/components/Metric';


export default class GAMetric extends Metric {

  getRandomMetric() {
    return Math.floor(Math.random() * 100) ;
  }

}

Registry.set('GAMetric', GAMetric);