import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseComponent from './BaseComponent';

export default class Metric extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      metric: '',
      caption:props.caption
    };
  }

  componentDidMount() {
    this.getMetric().then(this.onData.bind(this));
  }

  onData(data) {
    this.setState({metric: data});
  }

  getMetric() {
    return Promise.resolve(this[this.props.metric]());
  }

  render() {
    let style = {
      background: this.props.background,
    };
    style = Object.assign({}, style, this.props.style);
    return (
      <div className="metric" style={style}>
        <div className="col-sm-3 col-lg-4">
          <div className="card-metric-icon"><span className="glyphicon glyphicon-user"></span></div>
        </div>
        <div className="col-sm-9 col-lg-8">
          <div className="card-metric-number">
          {this.state.metric}
          </div>
          <div className="card-metric-caption">
          {this.state.caption}
          </div>
        </div>
      </div>
    )
  }
}

Registry.set('Metric', Metric);