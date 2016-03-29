import React, { Component } from 'react';
import Registry from '../utils/Registry';
import NVD3Chart from 'react-nvd3';
import BaseComponent from './BaseComponent';

export default class Chart extends BaseComponent {
  componentDidMount(){
    this.fetchData().then(this.onData.bind(this));
  }

  onData(data) {
    this.setData(data);
  }

  fetchData() {
    return Promise.resolve(this[this.props.fetchData]());
  }

  setData(data) {
    this.setState({data:data});
  }

  render() {
    let data = this.state.data || [];
    let settings = Object.assign({datum: data}, this.props.settings);
    return (<NVD3Chart {...settings}/>);
  }

}

Registry.set('Chart', Chart);
