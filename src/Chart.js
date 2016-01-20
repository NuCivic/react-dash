import React, { Component } from 'react';
import Registry from './Registry';
import NVD3Chart from 'react-nvd3';

export default class Chart extends Component {
  render() {
    let datum = Registry.get(this.props.data.datum);
    let settings = this.props.settings;
    settings.datum = datum(this.props.data.args);
    return (
      React.createElement(NVD3Chart, settings)
    );
  }
}

Registry.set('Chart', Chart);