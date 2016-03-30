import React, { Component } from 'react';
import EventDispatcher from '../dispatcher/EventDispatcher';

export default class BaseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
		console.log('Base Const', this.props.type);
  }

  componentDidMount(){
		console.log('.1');
		if (this.props.fetchData) {
    	this.fetchData().then(this.onData.bind(this));
		}
  }

  onData(data) {
    this.setData(data);
  }

  fetchData() {
		console.log('.2');
		console.log('fetchData', this.props.fetchData, this[this.props.fetchData]);
   	return Promise.resolve(this[this.props.fetchData]());
  }

  setData(data) {
		console.log('.3');
    this.setState({data:data});
  }

  emitChange(payload) {
		console.log('.4');
    EventDispatcher.dispatch(payload);
  }
}
