import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { findDOMNode } from 'react-dom';
import EventDispatcher from '../dispatcher/EventDispatcher';
import Dataset from '../models/Dataset';
import {omit, isEqual, isEmpty, isFunction, isPlainObject, isString, isArray, debounce} from 'lodash';
import StateHandler from '../utils/StateHandler';
import Registry from '../utils/Registry';
import { makeKey } from '../utils/utils';
import { qFromParams, getOwnQueryParams, getFID, objToQueryString } from '../utils/paramRouting';

export default class BaseComponent extends Component {

  constructor(props) {
    super(props);

    this.makeKey = makeKey;
    this.state = {
      data: [],
      dataset: null,
      queryObj: Object.assign({from: 0}, this.props.queryObj), // dataset query
      isFetching: false,
    };
  }
  
  /**
   * LIFECYCLE
   **/
  componentWillMount() {
    // Register to all the actions
    EventDispatcher.register(this.onAction.bind(this));
  }
  
  componentDidMount(){
    // resize magic
    let componentWidth = findDOMNode(this).getBoundingClientRect().width;
    let newState = this.executeStateHandlers();

    newState.componentWidth = componentWidth;

    // @@TODO encapsulate this in a function _applyStateHandlers();
    
    
    this.setState(newState);
    this.onResize();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(this.props.data, prevProps.data)) {
      this.setState(this.executeStateHandlers());
    }
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

  /**
   * If stateHandlers are defined on the component call them and return the result
   *
   * @returns {obj} object with calculated state paramaters
   */
  executeStateHandlers() {
    let newState = {};
    
    if (this.props.stateHandlers && this.props.stateHandlers.length > 0) {
      let handledState = StateHandler.handle(this.props.stateHandlers, this.props.data, this.state.dashboardData);
      newState = Object.assign(newState, handledState);
    }
    
    return newState;
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
