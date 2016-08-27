import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseComponent from './BaseComponent';
import Card from './Card';

export default class Dashboard extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {data: []};
  }
  
  /**
   * Recursively parse settings tree, rendering components
   * and children
   **/
  walkSettingsTree() {
    // recurse tree
    // render children
  }
  
  render() {
    let markup;
    let props = Object.assign({globalData: this.state.data || []}, this.props.route || this.props);
    console.log('RENDER');  
    return (
        <div className="container">
          <h1 className="dashboard-title">{this.props.title}</h1>
          {props.components.map((element, key) => {
            return (
              <Card key={key} {...element}>
                {React.createElement(Registry.get(element.type), Object.assign(props.components[key], {globalData: this.state.data, route: this.props.route}))}
              </Card>
            )
          })}
        </div>
    );
  }
}
