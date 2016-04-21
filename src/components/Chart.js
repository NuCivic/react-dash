import React, { Component } from 'react';
import Registry from '../utils/Registry';
import NVD3Chart from 'react-nvd3';
import BaseComponent from './BaseComponent';
import Loader from './Loader';

export default class Chart extends BaseComponent {
  render() {
    let data = this.getData() || [];
    let settings = Object.assign({datum: data}, this.props.settings);

    return (
      <Loader isFeching={this.state.isFeching}>
        <NVD3Chart {...settings}/>
      </Loader>
    );
  }
}

Registry.set('Chart', Chart);
