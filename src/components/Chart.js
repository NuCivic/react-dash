import React, { Component } from 'react';
import Registry from '../utils/Registry';
import NVD3Chart from 'react-nvd3';
import BaseComponent from './BaseComponent';
import Loader from './Loader';
import Filter from './Filter';
import { makeKey } from '../utils/utils';
import { isFunction } from 'lodash';
import { format } from 'd3';

export default class Chart extends BaseComponent {
  constructor (props) {
    super(props);

    if (!this.state.key) {
      this.state.key = makeKey();
    }
  }
  
  // given a d3 format specifier, return a d3 formatting
  // function for use by react-nvd3 component
  getFormatter(specifier, time=false) {
    if (typeof specifier === 'string') {
      return format(specifier);
    }
    if (isFunction(specifier)) {
      return specifier;
    }
  }
  
  getFormattedSettings() {
    let _settings = Object.assign({}, this.props.settings);
    
    Object.keys(_settings).forEach(k => {
      if (_settings[k].tickFormat) {
        _settings[k].tickFormat = this.getFormatter(_settings[k].tickFormat);
      }
    });

    return _settings;
  }

  render() {
    let settings = Object.assign({datum: this.props.data, key: this.state.key}, this.getFormattedSettings());
    return (
        <NVD3Chart {...settings} key={this.state.key}/>
     )
  }
}

Registry.set('Chart', Chart);
