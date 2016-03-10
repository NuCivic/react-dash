import React, { Component } from 'react';
import Registry from './Registry';
import NVD3Chart from 'react-nvd3';
import {execute, bindListeners} from './utils';

export default class Chart extends Component {
  render() {
    let props = bindListeners(this.props);
    let settings = props.settings;
    settings.datum = execute(props.data, props.context);
    return (
      React.createElement(NVD3Chart, settings)
    );
  }
}

Registry.set('Chart', Chart);