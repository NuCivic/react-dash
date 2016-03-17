import React, { Component } from 'react';
import Registry from './Registry';
import NVD3Chart from 'react-nvd3';
import {execute, bindListeners} from './utils';
import {FetchData} from './FetchData';
class Chart extends Component {

  constructor(props){
    super(props);
  }

  render() {
    let settings = Object.assign({datum: this.props.data}, this.props.settings);
    return (
      React.createElement(NVD3Chart, settings)
    );
  }

}

let AsyncChart = FetchData(Chart);
Registry.set('Chart', AsyncChart);
export default AsyncChart;
