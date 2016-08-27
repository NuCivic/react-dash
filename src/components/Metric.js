import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseComponent from './BaseComponent';
import Loader from './Loader';

export default class Metric extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = Object.assign({}, {
      metric: 0,
    }, this.state);
  }

  getMetric(data) {
    if (this.props.metric && typeof(this[this.props.metric])) {
      console.log('a');
      return this[this.props.metric](data);
    } else if (this.props.value) {
      console.log('b');
      return this.props.value;
    } else if (this.props.dataHandlers && this.props.dataHandlers.length > 0) {
      console.log('c', this);
      // if the datahandlers have set data, use that, otherwise set the data using the components datahandlers
      if (this.state.data && this.state.data.length > 0) { 
        return this.state.data[0]; 
      } else {
        this.applyDataHandlers();
      }
    }
  }

  render() {
    let style = {
      background: this.props.background,
    };
    style = Object.assign({}, style, this.props.style);
    return (
      <Loader isFeching={this.state.isFeching}>
        <div className="metric" style={style}>
          <div className="col-sm-3 col-lg-4">
            <div className="card-metric-icon"><span className={this.props.iconClass}></span></div>
          </div>
          <div className="col-sm-9 col-lg-8">
            <div className="card-metric-number">
            {this.getMetric(this.getData())}
            </div>
            <div className="card-metric-caption">
            {this.props.caption}
            </div>
          </div>
        </div>
      </Loader>
    )
  }
}

Registry.set('Metric', Metric);
