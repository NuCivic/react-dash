import React, { Component } from 'react';
import {findDOMNode} from 'react-dom';
import {browserHistory} from 'react-router';
import EventDispatcher from '../dispatcher/EventDispatcher';
import Dataset from '../models/Dataset';
import {omit, isFunction, isPlainObject, isString, debounce} from 'lodash';
import DataHandler from '../utils/DataHandler';
import Registry from '../utils/Registry';
import {qFromParams} from '../utils/utils';

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
    this.fetchData();
    this.applyOwnFilters();
    this.onResize();
  }
  
  fetchData() {
    let type = this.getFetchType();
    if(type){

      // fetch data is a function in the subcomponent
      if(type === 'function' && isFunction(this[this.props.fetchData.name])) {
        let args = this.props.fetchData.args || [];
        this.setState({isFeching: true});
        this._fetchData(...args).then(this.onData.bind(this));

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
  }
 
  _fetchData() {
   	return Promise.resolve(this[this.props.fetchData.name]());
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
  
  // filters, from settings, to render on component
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
	
  // on change event for filter
  onFilter(filter, e) {
    console.log(this, filter, e);
    const id = this.props.cid + '_' + filter.cid;
    const newParams = {id : e};
    let newQ = Object.assign({}, this.props.location.query);
    newQ[id] = e.value;
    console.log(newQ);
    console.log(qFromParams(newQ));
    browserHistory.push(qFromParams(newQ));
// ownParams - apply!!
//    let handlers = filter.dataHandlers;
//    handlers.e = e;
//    let _data = this.state.data || [];
 //   this.setState({filterHandlers: handlers, filterEvent: e});
  //  this.fetchData();
  }
  
  // Apply filters from query
  applyOwnFilters() {
    const ownParams = this.props.ownParams;
    if (ownParams) {
      for (var p in ownParams) {
        console.log('OP', ownParams, p, this.props);
        const filter = this.props.filters.filter(f => {
          return ownParams[p].fid === f.cid});
        console.log('FILTER', filter);
        // get the correct filter
        // let handlers = filter.dataHandlers
        // this.setState({filterHandlers: handlers, filterEvent: e}); // @@TODO we should lose filterEvent
        // this.fetchData();
      }
    }
    // each own filters
    //   -> pass values to datahandlers
    //   -> setState
    //   -> fetchData
  }

  setData(data, handlers, e) {
    let _handlers = handlers || this.state.filterHandlers || this.props.dataHandlers;
    let _e = e || this.state.filterEvent
    let _data = data.hits || data;
    let _total = data.total || data.length;
    _data = DataHandler.handle.call(this, _handlers, _data, this.getGlobalData(), _e);
    this.setState({data: _data, total: _total, isFeching: false});
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
