import React, { Component } from 'react';
import Registry from './Registry';
import NVD3Chart from 'react-nvd3';
import {execute, bindListeners} from './utils';
import {FetchData} from './FetchData';
class Chart extends Component {

  constructor(props){
    super(props);
    let _props = bindListeners(this.props);
    let settings = _props.settings;
    this.state = {settings: settings};
  }

  render() {
    this.state.settings.datum = this.props.data;
    return (
      React.createElement(NVD3Chart, this.state.settings)
    );
  }

}

let AsyncChart = FetchData(Chart);
Registry.set('Chart', AsyncChart);
export default AsyncChart;
