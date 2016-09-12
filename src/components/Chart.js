import React, { Component } from 'react';
import Registry from '../utils/Registry';
import NVD3Chart from 'react-nvd3';
import BaseComponent from './BaseComponent';
import Loader from './Loader';
import Filter from './Filter';
import {makeKey} from '../utils/utils'

export default class Chart extends BaseComponent {
  render() {
    const key = makeKey();
    let settings = Object.assign({datum: this.state.data, key: key}, this.props.settings);
    return (
      <Loader isFeching={this.state.isFeching} key={key}>
        {this.getFilters()}
        <NVD3Chart {...settings} key={key}/>
      </Loader>
     )
  }
}

Registry.set('Chart', Chart);
