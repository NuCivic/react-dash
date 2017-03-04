import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseComponent from './BaseComponent';
import Loader from './Loader';
import { format } from 'd3';

export default class Metric extends BaseComponent {
  getValue() {
    let val = this.props.value || this.props.data[0];
    let formatter;
    
    if (this.props.format) {
      formatter = format(this.props.format);
      val = formatter(val);
    }
    
    if (val == "NaN") return '...';
    return val;
  }

  render() {
    let bg = this.state.bg || this.props.background;
    let style = {
      background: bg,
    };
    style = Object.assign({}, style, this.props.style);
    return (
      <Loader isFetching={this.state.isFetching}>
        <div className="metric {}" style={style}>
          <div className="col-sm-3 col-lg-4">
            <div className="card-metric-icon"><span className={this.props.iconClass}></span></div>
          </div>
          <div className="col-sm-9 col-lg-8">
            <div className="card-metric-number">
              {this.getValue()}
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
