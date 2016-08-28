import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseComponent from './BaseComponent';
import Card from './Card';

export default class Dashboard extends BaseComponent {
  render() {
    let markup;
    console.log('DASH RENDER', this);
    return (
        <div className="container">
          <h1 className="dashboard-title">{this.props.title}</h1>
          {this.props.components.map((element, key) => {
            return (
              <Card key={key} {...element}>
                {React.createElement(Registry.get(element.type), Object.assign(this.props.components[key], {globalData: this.state.data, route: this.props.route}))}
              </Card>
            )
          })}
        </div>
    );
  }
}
