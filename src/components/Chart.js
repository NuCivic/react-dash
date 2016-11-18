import React, { Component } from 'react';
import Registry from '../utils/Registry';
import NVD3Chart from 'react-nvd3';
import BaseComponent from './BaseComponent';
import Loader from './Loader';
import Filter from './Filter';
import {makeKey} from '../utils/utils'

export default class Chart extends BaseComponent {
  constructor (props) {
    super(props);

    if (!this.state.key) {
      console.log('no key');
      this.state.key = makeKey();
    }
  }
  
  render() {
    let settings = Object.assign({datum: this.state.data, key: this.state.key}, this.props.settings);
    return (
      <Loader isFeching={this.state.isFeching} key={this.state.key}>
        {this.getFilters()}
        <NVD3Chart {...settings} key={this.state.key}/>
      </Loader>
     )
  }
}

Registry.set('Chart', Chart);
