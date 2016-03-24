import React, { Component } from 'react';
import EventDispatcher from './EventDispatcher';

export default class BaseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  emitChange(payload) {
    EventDispatcher.dispatch(payload);
  }
}
