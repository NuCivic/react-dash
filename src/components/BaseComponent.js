import React, { Component } from 'react';
import EventDispatcher from '../dispatcher/EventDispatcher';

export default class BaseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
		if (this.props.fetchData && this[this.props.fetchData]) {
    	this.fetchData().then(this.onData.bind(this));
		}
  }

  onData(data) {
    this.setData(data);
  }

  fetchData() {
   	return Promise.resolve(this[this.props.fetchData]());
  }

  setData(data) {
    this.setState({data:data});
  }

  emitChange(payload) {
    EventDispatcher.dispatch(payload);
  }
}
