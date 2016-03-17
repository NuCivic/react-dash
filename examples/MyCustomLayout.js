import React from 'react';
import Layout from '../src/components/Layout';
import Registry from '../src/Registry';

export default class MyCustomLayout extends Layout {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">{this.renderRegion(this.props.regions.top)}</div>
        </div>
        <div className="row">
          <div className="col-md-3">{this.renderRegion(this.props.regions.middleFirst)}</div>
          <div className="col-md-3">{this.renderRegion(this.props.regions.middleSecond)}</div>
          <div className="col-md-3">{this.renderRegion(this.props.regions.middleThird)}</div>
          <div className="col-md-3">{this.renderRegion(this.props.regions.middleFourth)}</div>
        </div>
        <div className="row">
          <div className="col-md-6">{this.renderRegion(this.props.regions.left)}</div>
          <div className="col-md-6">{this.renderRegion(this.props.regions.right)}</div>
        </div>
        <div className="row">
          <div className="col-md-12">{this.renderRegion(this.props.regions.bottom)}</div>
        </div>
      </div>
    );
  }
}

Registry.set('MyCustomLayout', MyCustomLayout);