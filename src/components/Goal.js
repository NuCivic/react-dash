import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseComponent from './BaseComponent';
import Card from './Card';
import Loader from './Loader';
import {head, template, capitalize, merge} from 'lodash';
import NVD3Chart from 'react-nvd3';
import classnames from 'classnames';
import {formatDate, formatNumber} from '../utils/utils';
import DataHandler from '../utils/DataHandler';

export default class Goal extends BaseComponent {

  static defaultProps = {
    captionTemplates: {
      'increase': '${action} ${caption} ${endNumber} by ${endDate}',
      'decrease': '${action} ${caption} ${endNumber} by ${endDate}',
      'maintain': '${action} at ${endNumber} ${caption} by ${endDate}',
      'maintain_above': '${action} ${endNumber} ${caption} by ${endDate}',
      'maintain_below': '${action} ${endNumber} ${caption} by ${endDate}',
      'mesure': '${caption}',
    },
    divider: ' / ',
    style: {
      color: 'black',
      background: 'white',
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      metric: 0,
      showEndNumber: (this.props.showEndNumber === false) ? false : true,
      dateFormat: this.props.dateFormat || '%b %m %Y',
      numberFormat: this.props.numberFormat || '.0f',
    };
  }

  getMetric(data) {
    let metricHandler = DataHandler.get(this.props.metric);
    return metricHandler(data);
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
    let distance = projection - this.getMetric(this.state.data);
    let actionContitions = {
      increase: distance <= 0,
      decrease: distance >= 0,
      maintain_above: distance <= 0,
      maintain_below: distance >= 0,
      maintain: true,
      mesure: true
    };
    return this.getTolerance(distance, actionContitions[this.props.action]);
  }

  getTracker(startDate, endDate, startNumber,  endNumber){
    return function (date){
      // Straight line equation
      let m = (endNumber - startNumber) / (endDate - startDate);
      let y = m * (date - startDate);
      return y;
    }
  }

  formatActionName(action) {
    return capitalize(this.props.action.replace('_', ' '));
  }

  getCaption() {
    let params = {
      'action': this.formatActionName(this.props.action),
      'caption': this.props.caption,
      'startNumber': formatNumber(this.props.startNumber, this.state.numberFormat),
      'endNumber': formatNumber(this.props.endNumber, this.state.numberFormat),
      'startDate': formatDate(new Date(this.props.startDate), this.state.dateFormat),
      'endDate': formatDate(new Date(this.props.endDate), this.state.dateFormat)
    };
    let compiled =  template(this.props.captionTemplates[this.props.action]);
    return compiled(params);
  }

  render() {
    let status = Object.assign({}, head(this.trackStatus()));
    let style = {
      background: this.props.background
    };
    let spline, endNumber;

    style = Object.assign({}, style, this.props.style);

    // Adds the spline chart
    if(this.props.spline) {
      let splineSettings = Object.assign({}, this.props.spline);
      spline = <NVD3Chart type="sparklinePlus" datum={this.state.data} showLastValue={false} color={['#333333']}{...splineSettings}/>
    }

    // This allows to show either a single number or a progress in the following format: number / total
    if(this.state.showEndNumber) {
      endNumber = <span className="card-goal-end-number"> {this.props.divider} {formatNumber(this.props.endNumber, this.state.numberFormat)}</span>;
    }

    return (
    <Card {...this.state.cardVariables}>
      <Loader isFetching={this.props.isFetching}>
        <div className="goal" style={style}>
          <div className="row">
            <div className="col-md-4">
              <div className="card-goal-icon">
                <span className={classnames('glyphicon', this.props.icon)}></span>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card-goal-caption">{this.getCaption()}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="card-goal-progress">
               <span className="card-goal-metric">{formatNumber(this.getMetric(this.state.data), this.state.numberFormat)}</span>
               {endNumber}
              </div>
            </div>
            <div className="col-md-8">
              <div className="card-goal-status">
                <a style={{color: status.color}} href={this.props.link}>{status.label}</a>
              </div>
              <div className="card-goal-end-date">
              {formatDate(new Date(this.props.endDate), this.state.dateFormat)}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="spline">
              {spline}
              </div>
            </div>
          </div>
        </div>
      </Loader>
    </Card>
    )
  }
}

Registry.set('Goal', Goal);
