import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseComponent from './BaseComponent';
import Card from './Card';

/**
 * @@TODO Currently in practice this only handles regions
 * MOST OF THIS LOGIC IS REPRODUCE IN THE Region Component
 * We should refactor so this is not the case
 */
export default class Dashboard extends BaseComponent {
  render() {
    let markup;
    let location = 
    console.log('DASH RENDER', this);
    // We wrap the whole dashboard in the route so we that we get paramater info in the els
    // @@TODO this needs to be repeated in Region because of our dumb scheme
    return (
        <div className="container">
          <h1 className="dashboard-title">{this.props.title}</h1>
          {this.props.components.map((element, key) => {
            let props = Object.assign(this.props.components[key], {globalData: this.state.data});
            let output;

            if (props.cardType !== 'undefined') {
              output = 
                <Card key={key} {...element}>
                  {React.createElement(Registry.get(element.type), Object.assign(this.props.components[key], props))}
                </Card>
            } else {
              output = 
                React.createElement(Registry.get(element.type), Object.assign(this.props.components[key], props))
            }
            return output;
          })}
        </div>
    );
  }
}
