import React, { Component } from 'react';
import Registry from './Registry';

export default class Card extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="card">
        <div className="header">{this.props.header}</div>
        {this.props.children}
        <div className="footer">{this.props.footer}</div>
      </div>
    )
  }
}

Registry.set('Card', Card);