import React, { Component } from 'react';
import Registry from './Registry';
import {execute} from './utils';
import EventDispatcher from './EventDispatcher';
import DashboardConstants from './constants';
export default class Metric extends Component {
  componentDidMount() {
    EventDispatcher.handleViewAction({
      actionType: DashboardConstants.EXECUTE,
      reference: this.props.getMetric,
      id: this.props.id
    });
  }

  render() {
    let style = {
      background: this.props.background,
    };
    style = Object.assign({}, style, this.props.style);
    return (
      <div className="metric" style={style}>
        <div className="col-md-4">
          <div className="card-metric-icon"><span className="glyphicon glyphicon-user"></span></div>
        </div>
        <div className="col-md-8">
          <div className="card-metric-number">
          {this.props.metric}
          </div>
          <div className="card-metric-caption">
          {this.props.caption}
          </div>
        </div>
      </div>
    )
  }
}

Registry.set('Metric', Metric);