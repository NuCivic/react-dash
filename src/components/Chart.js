import React, { Component } from 'react';
import Registry from '../utils/Registry';
import NVD3Chart from 'react-nvd3';
import BaseComponent from './BaseComponent';
import Loader from './Loader';
import Filter from './Filter';

export default class Chart extends BaseComponent {
  render() {
    let settings = Object.assign({datum: this.state.data}, this.props.settings);
    console.log('CHART', this);
    return (
      <Loader isFeching={this.state.isFeching}>
        {this.getFilters()}
        <NVD3Chart {...settings}/>
      </Loader>
     )
  }
}

Registry.set('Chart', Chart);
