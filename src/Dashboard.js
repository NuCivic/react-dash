import React, { Component } from 'react';
import Geary from './layouts/Geary';
import Registry from './Registry';
import BaseComponent from './BaseComponent';
import EventDispatcher from './EventDispatcher';

export default class Dashboard extends BaseComponent {
  componentWillMount() {
    EventDispatcher.register(this.onAction.bind(this));
  }

  onAction(payload) {
    switch(payload.actionType) {
      case 'CHANGE':
        this[payload.callback](payload);
        break;
    }
  }

  render() {
    var layout = (typeof this.props.layout === 'string') ? Registry.get(this.props.layout) : this.props.layout;
    if(!layout) throw new Error(`Missing layout class ${this.props.layout}`);
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