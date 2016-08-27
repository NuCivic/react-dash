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

  getFetchType() {
    console.log('fetchType', this.props.type, this.props.fetchData);
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
    var that = this;
    this.fetchData();
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
        this.applyDataHandlers(this.props.fetchData.records);
      
      // if components only need globalData, then dataHandlers can be used to supply the component with filtered data
      // this is an intermediary step that should make it unecessary to extend components (eg: GAChart) in order to 
      // write data filtering functions. Data filtering functions can be kept in dataHandlers for now, as a means towards
      // isolating custom data handling code
      } else if(type="global") {  
        console.log('global data', this, this.props, this.props.globalData);
        this.applyDataHandlers(this.props.globalData || []);
      }
    } else {
      console.log('No fetch type set', this);
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

  onDataChange(data) {
    /* IMPLEMENT */
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
