import React, { Component } from 'react';
import Registry from '../utils/Registry';
import NVD3Chart from 'react-nvd3';
import BaseComponent from './BaseComponent';

export default class Chart extends BaseComponent {
  render() {
    let data = this.state.data || [];
    let settings = Object.assign({datum: data}, this.props.settings);
    return (<NVD3Chart {...settings}/>);
  }
}

Registry.set('Chart', Chart);
