import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import EventDispatcher from '../dispatcher/EventDispatcher';
import Dataset from '../models/Dataset';
import {omit, isFunction, isPlainObject, isString} from 'lodash';

export default class BaseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: null,
      queryObj: Object.assign({size: 10, from: 0}, this.props.queryObj),
      isFeching: false
    };
  }

  getFetchType() {
    return this.props.fetchData && this.props.fetchData.type;
  }

  handleResize() {
    let componentWidth = ReactDOM.findDOMNode(this).getBoundingClientRect().width;
    this.setState({ componentWidth : componentWidth});
    this.onResize();
  }

  onResize() {
    /* IMPLEMENT */
  }

  componentDidMount(){
    let type = this.getFetchType();

    // resize magic
    let componentWidth = ReactDOM.findDOMNode(this).getBoundingClientRect().width;
    this.setState({ componentWidth : componentWidth});
    window.addEventListener('resize', this.handleResize.bind(this));

    if(type){

      // fetch data is a function in the subcomponent
      if(type === 'function' && isFunction(this[this.props.fetchData.name])) {
        let args = this.props.fetchData.args || [];
        this.setState({isFeching: true});
        this.fetchData(...args).then(this.onData.bind(this));

      // fetch data is a backend
      } else if(type === 'backend') {
        let dataset = new Dataset(omit(this.props.fetchData, 'type'));
        this.setState({isFeching: true, dataset: dataset});
        dataset.fetch().then(() => {
          this.query(this.state.queryObj);
        });

      // fetch data is an array
      } else if(type === 'inline'){
        this.setData(this.props.fetchData.records);
      }
    }

    // Register to all the actions
    EventDispatcher.register(this.onAction.bind(this));
  }

  onAction() {
    /* IMPLEMENT */
  }

  query(query) {
    if(this.state.dataset) {
      this.state.dataset.query(query).then(this.onData.bind(this));
      this.setState({queryObj: query, isFeching: true});
    } else {
      throw new Error("Missing dataset. You need to use a backend to query against");
    }
  }

  onData(data) {

    // We create a dataset then we can perform queries against.
    if(!this.state.dataset){
      this.state.dataset = new Dataset({records: data});
    }
    this.setData(data);
    this.onDataReady(data);
  }

  onDataReady(data) {
    /* IMPLEMENT */
  }

  fetchData() {
   	return Promise.resolve(this[this.props.fetchData.name]());
  }

  setData(data) {
    let _data = data.hits || data;
    let _total = data.total || data.length;
    this.setState({data: _data, total: _total, isFeching: false});
  }

  emit(payload) {
    EventDispatcher.dispatch(payload);
  }
}
