import React from 'react';
import { format } from 'd3';
import Registry from '../utils/Registry';
import BaseComponent from './BaseComponent';
import Card from './Card';
import Loader from './Loader';

export default class Metric extends BaseComponent {
  getValue() {
    let val = this.props.value || this.props.data[0];
    let formatter;

    if (this.props.format) {
      formatter = format(this.props.format);
      val = formatter(val);
    }

    if (val === 'NaN') return '...';
    return val;
  }

  render() {
    const bg = this.state.bg || this.props.background;
    let style = {
      background: bg,
    };
    let metric;

    if (this.props.iconClass) {
      metric =
        (
          <div className="metric-with-icon">
            <div className="col-sm-3 col-lg-4">
              <div className="card-metric-icon"><span className={this.props.iconClass} /></div>
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
        );
    } else {
      metric =
        (
          <div className="metric-without-icon">
            <div className="card-metric-number">
              {this.getValue()}
            </div>
            <div className="card-metric-caption">
              {this.props.caption}
            </div>
          </div>
        );
    }
    style = Object.assign({}, style, this.props.style);
    return (
      <Card {...this.state.cardVariables}>
        <Loader isFetching={this.state.isFetching}>
          <div className="metric" style={style}>
            {metric}
          </div>
        </Loader>
      </Card>
    );
  }
}

Registry.set('Metric', Metric);
