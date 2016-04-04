import React, { Component } from 'react';
import Registry from '../../src/utils/Registry';
import Goal from '../../src/components/Goal';
import last from 'lodash/last';

export default class GAGoal extends Goal {

  getData() {
    return this.randomData(50.0, 0.02);
  }

  getRandomMetric(data) {
    return Number(last(data).y).toFixed(2);
  }

  randomData(startPrice, volatility, numPoints) {
      var rval =  [];
      var now =+new Date();
      numPoints = numPoints || 100;
      for(var i = 1; i < numPoints; i++) {
          rval.push({x: now + i * 1000 * 60 * 60 * 24, y: startPrice});
          var rnd = Math.random();
          var changePct = 2 * volatility * rnd;
          if ( changePct > volatility) {
              changePct -= (2*volatility);
          }
          startPrice = startPrice + startPrice * changePct;
      }
      return rval;
  }
}

Registry.set('GAGoal', GAGoal);
