import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import {findDOMNode} from 'react-dom';
import EventDispatcher from '../dispatcher/EventDispatcher';
import Dataset from '../models/Dataset';
import {omit, isEqual, isFunction, isPlainObject, isString, debounce} from 'lodash';
import DataHandler from '../utils/DataHandler';
import Registry from '../utils/Registry';
import {qFromParams} from '../utils/utils';

export default class BaseComponent extends Component {

  constructor(props) {
    super(props);
    console.log('RR', this);
    this.state = {
      data: [],
      dataset: null,
      queryObj: Object.assign({from: 0}, this.props.queryObj),
      isFeching: false,
      ownParams: this.props.ownParams
    };
  }

  componentWillMount() {
    // Register to all the actions
    EventDispatcher.register(this.onAction.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resizeHandler);
  }

  componentWillReceiveProps() {
    this.applyOwnFilters();
  }
  
  /**
   * Allowable types:
   *   backend - uses an existing data backend (CSV, CartoDB, etc)
   *   global - uses a dataHandler function to extract data from globalData
   *   data - component is supplied data via props.data which it will use directly
   */
  getFetchType() {
    let type = 'global'; 
    if (this.props.fetchData && this.props.fetchData.type) {
      type = 'backend';
    } else if (this.props.data) {
      type = 'data';
    }
    return type;
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
    this.fetchData();
    this.onResize();
  }

  // if global data
  componentDidUpdate(nextProps, nextState) {
    let globalDataEqual = _.isEqual(nextProps.globalData, this.props.globalData);
    // if globalData has been updated, we should run fetchData again
    if (!globalDataEqual) {
      this.fetchData(); 
    }
  }
  
  /**
   * NOTE:
   * fetchData and datahandling generally should ultimately be
   * handled OUTSIDE OF THE REACT-DASHBOARD APPLICATION
   * All components should be able to accept a know data format 
   * and render from state.data
   *
   *  The fetchData logic here represents an interim model layer
   *  that will eventually be a redux store or even another app
   */
  fetchData() {
    let type = this.getFetchType();
    switch (type) {
      case 'backend':
        this.fetchBackend();   
      case 'global':
        this.applyDataHandlers();
      case 'data':
        this.applyDataHandlers(this.props.data);
    }  
  }
  
  /**
   * Use backends to fetch data and query the result
   */
  fetchBackend() {
    let dataset = new Dataset(omit(this.props.fetchData, 'type'));
    let queryObj = this.state.queryObj;
    this.setState({isFeching: true, dataset: dataset});
    dataset.fetch().then(() => {
      this.state.dataset.query(queryObj).then(queryRes => {
        this.applyDataHandlers(queryRes);
      }).catch(e => {
        console.log('Error fetching', e);
      });
    });
  } 
  
  getFilters() {
		let filters;
  	if (Array.isArray(this.props.filters)) {
      filters = this.props.filters.map(filter => {
         filter.onChange = this.onFilter.bind(this, filter);
         return React.createElement(Registry.get('Filter'), filter);
      });
	  }
    return filters;
  }
	
  onFilter(filter, e) {
    let handlers = filter.dataHandlers;
    handlers.e = e;
    
    let _data = this.state.data || [];
    // @@TODO add new filter params to query string
    this.setState({filterHandlers: handlers, filterEvent: e});
    this.fetchData();
  }

  applyOwnFilters() {
    // @@ GOOD HERE
    const ownParams = this.state.ownParams;
    if (ownParams) {
      // @@ GOOD HERE
      for (var p in ownParams) {
        const filter = this.props.filters.filter(f => {
          return ownParams[p].fid === f.cid})[0];
        let handlers = filter.dataHandlers
        this.setState({filterHandlers: handlers, filterEvent: ownParams[p]});
      }
    }
  }  

  // @@TODO I think these data handling functions should be 'pure' - not call setState etc
  applyDataHandlers(data = [], handlers, e) {
    let _handlers = handlers || this.state.filterHandlers || this.props.dataHandlers;
    let _e = e || this.state.filterEvent
    let _data = data.hits || data;
    let _total = data.total || data.length;
    _data = DataHandler.handle.call(this, _handlers, _data, this.getGlobalData(), _e);
    this.setState({data: _data, total: _total, isFeching: false});
  }

  emit(payload) {
    EventDispatcher.dispatch(payload);
  }

  getGlobalData() {
    return this.props.globalData || [];
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
