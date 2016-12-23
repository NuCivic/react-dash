import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import {findDOMNode} from 'react-dom';
import EventDispatcher from '../dispatcher/EventDispatcher';
import Dataset from '../models/Dataset';
import {omit, isEqual, isEmpty, isFunction, isPlainObject, isString, isArray, debounce} from 'lodash';
import DataHandler from '../utils/DataHandler';
import Registry from '../utils/Registry';
import {qFromParams, getOwnQueryParams, getFID, objToQueryString} from '../utils/paramRouting';

export default class BaseComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataset: null,
      queryObj: Object.assign({from: 0}, this.props.queryObj), // dataset query
      isFeching: false,
    };
  }
  
  /**
   * LIFECYCLE
   **/
  componentWillMount() {
    // Register to all the actions
    EventDispatcher.register(this.onAction.bind(this));
    let q = '';
    
    if (this.props.location) {
      q = this.props.location.query;
    }

    //let ownParams = getOwnQueryParams(q, this.props.cid, this.props.multi) || {};
    //this.setState({ownParams: ownParams});
  }
  
  componentDidMount(){
    // resize magic
    let componentWidth = findDOMNode(this).getBoundingClientRect().width;
    this.setState({ componentWidth : componentWidth});
    this.onResize();
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this._resizeHandler);
  }
  
  emit(payload) {
    EventDispatcher.dispatch(payload);
  }


  getGlobalData() {
    return this.props.globalData || [];
  }

  addResizeListener() {
    this._resizeHandler = (e) => {
      let componentWidth = findDOMNode(this).getBoundingClientRect().width;
      
      this.setState({ componentWidth : componentWidth});
      this.onResize(e);
    }
    window.addEventListener('resize', this._resizeHandler);
  }
  
  /**
   * Abstract
   */

  onResize() {
    /* IMPLEMENT */
  }

  onAction() {
    /* IMPLEMENT */
  }
  
}
