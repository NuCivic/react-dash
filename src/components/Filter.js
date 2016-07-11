import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseComponent from './BaseComponent';

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
    return React.createElement(Registry.get(this.props.type), settings)
  }
}

Registry.set('Filter', Filter);
