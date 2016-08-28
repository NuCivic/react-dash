import React, { Component } from 'react';
import {findDOMNode} from 'react-dom';
import EventDispatcher from '../dispatcher/EventDispatcher';
import Dataset from '../models/Dataset';
import {omit, isFunction, isPlainObject, isString, debounce} from 'lodash';
import DataHandler from '../utils/DataHandler';
import Registry from '../utils/Registry';


export default class BaseComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataset: null,
      queryObj: Object.assign({from: 0}, this.props.queryObj),
      isFeching: false
    };
  }

  componentWillMount() {
    // Register to all the actions
    EventDispatcher.register(this.onAction.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resizeHandler);
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
    console.log('fetch type:', type);
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
        this.fetchBackend().then()   
      case 'global':
        this.applyDataHandlers();
      case 'data':
        this.setState({data: this.props.data});
        this.applyDataHandlers();
      default:
        console.log('No data type defined for component', this);
    }  
  }
 
  fetchBackend() {
    let dataset = new Dataset(omit(this.props.fetchData, 'type'));
    this.setState({isFeching: true, dataset: dataset});
    dataset.fetch().then(() => {
      this.query(this.state.queryObj);
    });
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
    console.log('onData',data,this);
    // If it's a fetch response.
    if(data.json) {
      data.json().then((data) => this.applyDataHandlers(data));
    } else {

      // We create a dataset then we can perform queries against.
      if(!this.state.dataset){
        this.state.dataset = new Dataset({records: data});
      }
      this.applyDataHandlers(data);
    }
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
    this.setState({filterHandlers: handlers, filterEvent: e});
    this.fetchData();
  }
  
  // @@TODO I think these data handling functions should be 'pure' - not call setState etc
  applyDataHandlers(data = [], handlers, e) {
    console.log('apply data handlers', arguments, this);
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
