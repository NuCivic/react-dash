import React, { Component } from 'react';
import { connect } from 'react-redux'
import Registry from '../utils/Registry';
import NVD3Chart from 'react-nvd3';
import BaseComponent from './BaseComponent';
import Loader from './Loader';
import Filter from './Filter';

export default class Chart extends BaseComponent {
  
  render() {
    let data = this.getData() || [];
    let settings = Object.assign({datum: data}, this.props.settings);

    return (
      <Loader isFeching={this.state.isFeching}>
        {this.getFilters()} // render filter UI
        <NVD3Chart {...settings}/>
      </Loader>
     )
  }
}

Registry.set('Chart', Chart);
