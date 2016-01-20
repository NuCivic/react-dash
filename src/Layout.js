import React, { Component } from 'react';
import Chart from './Chart';
import Registry from './Registry';

export default class Layout extends Component {
  renderRegion(elements){
    if (!elements) return;
    return elements.map((element, key) => {
      element.key = key;
      return React.createElement(Registry.get(element.type), element);
    });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">{this.renderRegion(this.props.regions.top)}</div>
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

Registry.set('Layout', Layout);