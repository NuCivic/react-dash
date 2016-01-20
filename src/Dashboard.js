import React, { Component } from 'react';
import Layout from './Layout';
import Registry from './Registry';

export default class Dashboard extends Component {
  render() {
    return (
      React.createElement(Registry.get(this.props.layout), this.props)
    );
  }
}
