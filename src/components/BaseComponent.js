import React, { Component } from 'react';
import {findDOMNode} from 'react-dom';
import EventDispatcher from '../dispatcher/EventDispatcher';
import Dataset from '../models/Dataset';
import {omit, isFunction, isPlainObject, isString, debounce} from 'lodash';
import Adaptor from '../adaptors';

export default class BaseComponent extends Component {

  constructor(props) {
    super(props);
    console.log('000', props);
    this.state = {
      data: [],
      dataset: null,
      queryObj: Object.assign({size: 10, from: 0}, this.props.queryObj),
      isFeching: false,
      lib: props.lib,
      funcType: props.funcType
    };

  }

  componentWillMount() {
    // Register to all the actions
    EventDispatcher.register(this.onAction.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resizeHandler);
  }

  getFetchType() {
    return this.props.fetchData && this.props.fetchData.type;
  }

  onResize() {
    /* IMPLEMENT */
  }

  addResizeListener() {
    this._resizeHandler = (e) => {
      let componentWidth = findDOMNode(this).getBoundingClientRect().width;
      this.setState({ componentWidth : componentWidth});
      this.onResize(e);
    }
    window.addEventListener('resize', this._resizeHandler);
  }

  componentDidMount(){
    // resize magic
    let componentWidth = findDOMNode(this).getBoundingClientRect().width;
    this.setState({ componentWidth : componentWidth});
    this.addResizeListener();

    let type = this.getFetchType();
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
    this.onResize();
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
    // If it's a fetch response.
    if(data.json) {
      data.json().then((data) => this.setData(data));
    } else {

      // We create a dataset then we can perform queries against.
      if(!this.state.dataset){
        this.state.dataset = new Dataset({records: data});
      }
      this.setData(data);
    }
  }

  onDataChange(data) {
    /* IMPLEMENT */
  }

  /**
   * If there is an adaptor on file, adapt data
   */
  adaptData(data) {
    let _data = Object.assign([], data);
    if (this.props.type === 'GAChart') console.log('Ad0', _data, this.state);
    if (this.state.lib && this.state.funcType) {
      const adaptor = new Adaptor();
      const func = adaptor.lookup({lib:this.state.lib, type:this.state.funcType});
      console.log('Ad1', func);
      if (func && typeof func === 'function') {
        _data = func(data);
        console.log('Ad2', data);
      }
    }
    return _data;
  }
  
  fetchData() {
   	return Promise.resolve(this[this.props.fetchData.name]());
  }

  setData(data) {
    if (this.props.type === 'GAChart') console.log('sd0', data, this.props, this.state);
    let _data = data.hits || data;
    let _total = data.total || data.length;
    console.log('sd1', _data);
    let adaptedData = this.adaptData(_data);
    console.log('sd2', adaptedData);

    this.setState({data: adaptedData, total: _total, isFeching: false});
    this.onDataChange(data);
  }

  emit(payload) {
    EventDispatcher.dispatch(payload);
  }

  getData() {
    if(this.props.fetchData && this.props.fetchData.type === 'function') {
      let data = this[this.props.fetchData.name](this.props.fetchData.args);
      if(data.then) {
        return this.state.data || [];
      }
      return data;
    }
    return this.state.data || [];
  }

  getGlobalData() {
    return this.props.globalData || [];
  }
}
