import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseComponent from './BaseComponent';
import head from 'lodash/head';
import NVD3Chart from 'react-nvd3';
import moment from 'moment';

export default class Goal extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      metric: 50,
      style: {
        color: 'black',
        background: 'white',
      },
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

  getTolerance(distance, actionCondition) {
    let tolerance = this.props.tolerance;
    let dist = Math.abs(distance);
    return tolerance.filter((t) => {
      return actionCondition || (dist > t.from && dist <= t.to);
    })
  }

  trackStatus() {
    let startDate = Date.parse(this.props.startDate);
    let endDate = Date.parse(this.props.endDate);
    let startNumber = Number(this.props.startNumber);
    let endNumber = Number(this.props.endNumber);
    let tracker = this.getTracker(startDate, endDate, startNumber, endNumber);
    let projection = tracker(Date.now());
    let distance = projection - this.state.metric;
    let actionContitions = {
      increase: distance <= 0,
      decrease: distance > 0,
      maintain: true,
      mesure: true
    };

    return this.getTolerance(distance, actionContitions[this.props.action]);
  }

  getTracker(startDate, endDate, startNumber,  endNumber){
    return function (date){
      let m = (endNumber - startNumber) / (endDate - startDate);
      let y = m * (date - startDate);
      return y;
    }
  }

  render() {
    let status = Object.assign({}, head(this.trackStatus()));
    let style = {
      background: this.props.background,
      color: status.color
    };
    let spline;

    if(this.props.spline) {
      let splineSettings = Object.assign({}, this.props.spline);
      spline = <NVD3Chart type="sparklinePlus" datum={this.state.data} showLastValue={false} color={['#333333']}{...splineSettings}/>
    }
    style = Object.assign({}, style, this.props.style);
    return (
      <div className="metric" style={style}>
          <div className="col-md-6">
            <div className="card-metric-number">
            {this.state.metric}
            </div>
            <div className="card-metric-caption">
            {moment((new Date()).toISOString()).format('MMMM Do YYYY')}
            </div>
          </div>
          <div className="col-md-6">
            <div className="card-metric-number">
            {this.props.endNumber}
            </div>
            <div className="card-metric-caption">
            {moment((new Date(this.props.endDate)).toISOString()).format('MMMM Do YYYY')}
            </div>
            <div className="card-metric-caption">
            {status.label}
            <div><span className="glyphicon glyphicon-user"></span></div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="spline">
            {spline}
            </div>
          </div>
      </div>
    )
  }
}

Registry.set('Goal', Goal);