import React, { Component } from 'react';
import Geary from '../layouts/Geary';
import Registry from '../Registry';

export default class Dashboard extends Component {

  render() {
    var layout = (typeof this.props.layout === 'string') ? Registry.get(this.props.layout) : this.props.layout;
    return (
      <div className="container">
        <div className="container">
          <h1 className="dashboard-title">{this.props.title}</h1>
        </div>
        {React.createElement(layout, this.props)}
      </div>
    );
  }
}
