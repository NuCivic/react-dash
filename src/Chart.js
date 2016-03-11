import React, { Component } from 'react';
import Registry from './Registry';
import NVD3Chart from 'react-nvd3';
import {execute, bindListeners} from './utils';

let Chart = React.createClass({
  getInitialState: function () {
    console.log('Chart1', this);
  },
  render: function () {
    let props = bindListeners(this.props);
    let settings = props.settings;
    settings.datum = execute(props.data, props.context);
    return (
      React.createElement(NVD3Chart, settings)
    );
  }
});

Registry.set('Chart', Chart);

export default Chart;
