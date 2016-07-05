import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseComponent from './BaseComponent';
import DataHandler from '../utils/DataHandler';
import Select from './Select';

let exampleHandler = function (a,b,c,d,e) {
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

  let d1 = randomDate(new Date(2012, 0, 1), new Date());
  let d2 = randomDate(new Date(2012, 0, 1), new Date());
  let d3 = randomDate(new Date(2012, 0, 1), new Date());
  let r = [{date:d1,price:2}, {date:d2,price:3}, {date:d3,price:4}];
  return r;
}

DataHandler.set('exampleHandler', exampleHandler);

export default class Filter extends BaseComponent {
  getOptions() {
    if (typeof this.props.options === "object") {
      return this.props.options;
    }

    if (typeof this.props.options === 'string') {
      // handle function handler here
    }
  }

  render() {
    let settings = {};
    settings.options = this.getOptions();
    settings.onChange = this.props.onChange;
    if (settings.options.then) {
      options.then(data => {
        return (
            React.createElement(Registry.get(this.props.type), settings)
        );
      })
      // @@TODO handle promise here 
    } else {
      return (
          React.createElement(Registry.get(this.props.type), settings)
      );
    }
    return <p>Loading</p>
  }
}

Registry.set('Filter', Filter);
