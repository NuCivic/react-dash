import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseComponent from './BaseComponent';
import Loader from './Loader';

export default class Metric extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      metric: 0,
      caption:props.caption
    };
  }

  componentDidMount() {
    super.componentDidMount();

    // If doesn't need to fetch data then use the global data
    if(!this.props.fetchData) this.onDataReady(this.props.globalData);
  }

  onDataReady(data) {
    this.setState({metric: this.getMetric(data)});
  }

  getMetric(data) {
    return this[this.props.metric](data);
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
      </Loader>
    )
  }
}

Registry.set('Metric', Metric);