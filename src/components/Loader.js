import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseComponent from './BaseComponent';

export default class Loader extends Component {
  render() {
    let content;

    if(this.props.isFeching) {
      content = <div className="sp sp-slices"></div>;
    } else {
      content = <span>{this.props.children}</span>
    }
    return content;
  }
}