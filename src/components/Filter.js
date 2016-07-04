import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseComponent from './BaseComponent';
import DataHandler from '../utils/DataHandler';
import Select from './Select';

export default class Filter extends BaseComponent {
  onChange(e) {
    console.log('CHANGE', e);
    this.onFilter(e);
  }
  
  getOptions() {
    if (typeof this.props.options === "object") {
      console.log('obj', this.props.options);
      return this.props.options;
    }

    if (typeof this.props.options === 'string') {
      console.log('Handle', this.props.options);
      // handle handler here
    }
  }

  render() {
    let settings = {};
    settings.options = this.getOptions();
    if (settings.options.then) {
      console.log('Resolve promise');
      options.then(data => {
        console.log('tt', data.options);
        return (
            React.createElement(Registry.get(this.props.type), {options: data.options})
        );
      })
      // @@TODO handle promise here 
    } else {
      settings.onChange = this.onChange.bind(this);
      return (
          React.createElement(Registry.get(this.props.type), settings)
      );
    }
    return <p>Loading</p>
  }
}

Registry.set('Filter', Filter);
