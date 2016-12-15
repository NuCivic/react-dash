import React, { Component } from 'react';
import Registry from '../utils/Registry';
import NVD3Chart from 'react-nvd3';
import BaseComponent from './BaseComponent';
import Loader from './Loader';
import Filter from './Filter';
import { makeKey } from '../utils/utils'
import { format } from 'd3';

export default class Chart extends BaseComponent {
  constructor (props) {
    super(props);

    if (!this.state.key) {
      this.state.key = makeKey();
    }
  }

  
  render() {
    let settings = Object.assign({datum: this.props.data, key: this.state.key}, this.props.settings);
    console.log('CHAFRT', settings);
    return (
        <NVD3Chart {...settings} key={this.state.key}/>
     )
  }
}

Registry.set('Chart', Chart);
