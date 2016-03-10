import React, { Component } from 'react';
import Registry from './Registry';

export default class Card extends Component {
  render() {
    return (
      <div className="card">
        <h3 className="header">{this.props.header}</h3>
        {this.props.children}
        <div className="footer">{this.props.footer}</div>
      </div>
    )
  }
}

Registry.set('Card', Card);