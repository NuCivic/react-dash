/**
 * @@DEPRECATED
 * @@DEPRECATED
 * @@DEPRECATED
 *
 * All of this functionality has been moved
 * to the Dashboard component
 */

import React, { Component } from 'react';
import Registry from '../utils/Registry';
import { DataHandler } from '../ReactDashboard';
import Card from './Card';
import { pick } from 'lodash';

export default class Region extends Component {
  constructor(props) {
    super(props);
  }

  // ** NOTE - this is duplicated from Dashboard to mimic Dash's region rendering
  _applyDataHandlers(dataHandlers, appliedFilters, componentData=[]) {
    return  DataHandler.handle.call(this, dataHandlers, componentData, this.props.globalData, {}, appliedFilters);
  }

  getChildren() {
    let children;
    if (this.props.children) {
        children = this.props.children.map((element,key) => {
          let output;
          let props = Object.assign(element, {globalData: this.props.globalData, appliedFilters: this.props.appliedFilters});

          // get child data
          if (element.dataHandlers) {
            props.data = this._applyDataHandlers(element.dataHandlers, element.appliedFilters, element.data)
          } else if (element.data && element.data.length > 0) {
            props.data = element.data;
          }

          return React.createElement(Registry.get(element.type), props);
        })}
    return children;
  }

  render() {
    let children = this.getChildren();

      return (
        <div className={this.props.className}>
          {children}
        </div>
      )
  }
}

Registry.set('Region', Region);