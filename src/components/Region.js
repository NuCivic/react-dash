import React, { Component } from 'react';
import Registry from '../utils/Registry';
import { DataHandler } from '../ReactDashboard';

export default class Region extends Component {
  // ** NOTE - this is duplicated from Dashboard to mimic Dash's region rendering
  getChildren() {
    let children;
    if (this.props.children) {
      children = this.props.children.map((element, key) => {
        const props = Object.assign(
          element,
          { globalData: this.props.globalData, appliedFilters: this.props.appliedFilters },
        );

        // get child data
        if (element.dataHandlers) {
          props.data = this._applyDataHandlers(
            element.dataHandlers,
            element.appliedFilters,
            element.data,
          );
        } else if (element.data && element.data.length > 0) {
          props.data = element.data;
        }

        return React.createElement(Registry.get(element.type), props);
      });
    }

    return children;
  }

  _applyDataHandlers(dataHandlers, appliedFilters, componentData = []) {
    return DataHandler.handle.call(
      this,
      dataHandlers,
      componentData,
      this.props.globalData,
      {},
      appliedFilters,
    );
  }

  render() {
    const children = this.getChildren();

    return (
      <div className={this.props.className}>
        {children}
      </div>
    );
  }
}

Registry.set('Region', Region);
