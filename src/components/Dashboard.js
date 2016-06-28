import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseComponent from './BaseComponent';

export default class Dashboard extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  render() {
    let markup;
    
    if (this.props.layout) {
      let layout = (typeof this.props.layout === 'String') ? Registry.get(this.props.layout) : this.props.layout;
      let props = Object.assign({globalData: this.state.data || []}, this.props);
      console.log('LAYOUT', layout, props);
      console.log('isLayout', layout);
      markup = 
        <div className="container">
          <h1 className="dashboard-title">{this.props.title}</h1>
          {React.createElement(layout, props)}
        </div>
    } else {
      markup = <p>SHOWTIME</p>; 
    }

    return markup;
  }
}
