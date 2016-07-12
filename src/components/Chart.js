import React, { Component } from 'react';
import { connect } from 'react-redux'
import Registry from '../utils/Registry';
import NVD3Chart from 'react-nvd3';
import BaseComponent from './BaseComponent';
import Loader from './Loader';
import Filter from './Filter';
import filter from '../actions/filter'

export default class Chart extends BaseComponent {
  render() {
    let data = this.getData() || [];
    let settings = Object.assign({datum: data}, this.props.settings);
    console.log('CHH', this.props, this);
    return (
      <Loader isFeching={this.state.isFeching}>
        {this.getFilters()} // render filter UI
        {Object.keys(this.props.query).map(k => {console.log('CH2', this);
          return <p>{`key ${k} val ${this.props.query[k]}`}</p>
        })}
        //<NVD3Chart {...settings}/>
      </Loader>
     )
  }
}

Registry.set('Chart', Chart);
