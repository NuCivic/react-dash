import React, { Component } from 'react';
import Geary from './layouts/Geary';
import Registry from './Registry';

export default class Dashboard extends Component {

  render() {
    var layout = (typeof this.props.layout === 'string') ? Registry.get(this.props.layout) : this.props.layout;
    return (
      React.createElement(layout, this.props)
    );
  }
}
