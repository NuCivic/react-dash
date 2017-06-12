import React, { Component } from 'react';

export default class Loader extends Component {
  render() {
    let content;

    if (this.props.isFetching) {
      content = <div className="loader"><div className="sp sp-slices" /></div>;
    } else {
      content = <span>{this.props.children}</span>;
    }

    return content;
  }
}
