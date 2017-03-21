import React, { Component } from 'react';
import Registry from '../utils/Registry';
import Card from './Card';
import { pick } from 'lodash';

export default class Region extends Component {
  constructor(props) {
    super(props);
  }

  getChildren() {
    let children;
    if (this.props.children) {
        children = this.props.children.map((element,key) => {
          let output;
          let props = Object.assign(element, {globalData: this.props.globalData, appliedFilters: this.props.appliedFilters}, routeParams);
          return React.createElement(Registry.get(element.type), props);
        })}
    return children;
  }

  render() {
    let routeParams = pick(this.props, ['history', 'location', 'params', 'route', 'routeParams', 'routes']);
    let children = this.getChildren();

      return (
        <div className={this.props.className}>
          {children}
        </div>
      )
  }
}

Registry.set('Region', Region);
