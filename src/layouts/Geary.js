import React from 'react';
import Layout from '../Layout';
import Registry from '../Registry';

export default class Geary extends Layout {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">{this.renderRegion(this.props.regions.top)}</div>
        </div>
        <div className="row">
          <div className="col-md-4">{this.renderRegion(this.props.regions.left)}</div>
          <div className="col-md-4">{this.renderRegion(this.props.regions.middle)}</div>
          <div className="col-md-4">{this.renderRegion(this.props.regions.right)}</div>
        </div>
      </div>
    );
  }
}

Registry.set('Geary', Geary);