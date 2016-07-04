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
  
  render() {
    console.log('filter', this.props.type);
    let options = this.getOptions();
    console.log('Filter', options, this.props);
    if (options.then) {
      console.log('Resolve promise');
      options.then(data => {
        console.log('tt', data.options);
        return (
            React.createElement(Registry.get(this.props.type), {options: data.options})
        );
      })
      // @@TODO handle promise here 
    } else {
      Object.assign({}, this.props);
      options.onChange = this.onChange.bind(this);
      return (
          React.createElement(Registry.get(this.props.type), options)
      );
    }
  }
}

Registry.set('Filter', Filter);
