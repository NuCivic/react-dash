import React, { Component } from 'react';
import Registry from '../utils/Registry';
import NVD3Chart from 'react-nvd3';
import BaseComponent from './BaseComponent';
import Loader from './Loader';
import Filter from './Filter';

export default class Chart extends BaseComponent {
  render() {
    let data = this.getData() || [];
    let settings = Object.assign({datum: data}, this.props.settings);
    let filters;

    if (Array.isArray(this.props.filters)) {
      filters = this.props.filters.map(filter => {
         return <Filter {...filter} />
      })
    };
    console.log('fff',filters);
    return (
      <Loader isFeching={this.state.isFeching}>
        {filters}
        <NVD3Chart {...settings}/>
      </Loader>
     )
  }
}

Registry.set('Chart', Chart);
