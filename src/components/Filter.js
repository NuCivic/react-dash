import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseComponent from './BaseComponent';

export default class Filter extends BaseComponent {
  constructor(props) {
    super(props);
  }
  
  onChange(e) {
    console.log('CHANGE', e);
  }
  
  render() {
    console.log('filter', this.props.type);
    let options = Object.assign({}, this.props);
    options.onChange = this.onChange.bind(this);
    return (
        React.createElement(Registry.get(this.props.type), options)
    );
  }
}

Registry.set('Filter', Filter);
