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
    let result = this.fetchData.call(this).then(d => {
      console.log('xxx',d);
    });
    console.log('cdm-0', result)
    if (result && result.then) {
      console.log('cdm-A', result);
      result.then(res => {
        console.log('cdmA-0', res)
        if (res && res.then) {
          res.then(data => {
            console.log('cdm-A-1', data);
            this.setData.call(this, data);
          });
        }
      });
    } 
    
    this.addResizeListener();
    this.setState({ componentWidth : componentWidth});
    this.onResize();
  }
  
  // @@TODO - this should return data, NOT set data
  // @@ data should be set by an explicit call to setData
  // @@ delegates to fetchDataType function
  // @@ returns a promise
  fetchData() {
    let type = this.getFetchType();
    if(type){
      
      // fetch data is a function in the subcomponent
      if(type === 'function' && isFunction(this[this.props.fetchData.name])) {
        console.log('fd-A');
        let funcHandler = this[this.props.fetchData.name].bind(this);
        let args = this.props.fetchData.args || [];
        this.setState({isFeching: true});
        let result = funcHandler();
        return this.onData(result);
      // fetch data is a backend
      } else if(type === 'backend') {
        console.log('fd-B');
        let dataset = new Dataset(omit(this.props.fetchData, 'type'));
        this.setState({isFeching: true, dataset: dataset});
        return dataset.fetch().then(() => {
          let q = this.query(this.state.queryObj);
          console.log('fd-B-1', q);
          q.then(d => {
            console.log('fd-B-1-a', d);
            return Promise.resolve(d);
          });
        });
      // fetch data is an array
      } else if(type === 'inline'){
        return Promise.resolve(this.props.fetchData.records);
      }
    } else {
      console.warn('Warning: Fetch type not defined for component. Check settings.js', this);
    }
  }
  
  fetchFunctionData() {
  
  }

  fetchBackendData() {
  
  }

  fetchArrayData() {
  
  }

  onData(data) {
    console.log('od', data);
    // If it's a fetch response.
    if(data.json) {
      console.log('od-A', data.json);
      data.json().then(data => {
        return Promise.resolve(data);
      });
    } else {
      console.log('od-B');

      // We create a dataset then we can perform queries against.
      if(!this.state.dataset){
        this.state.dataset = new Dataset({records: data});
      }
      return Promise.resolve(data);
    }
  }
  
  query(query) {
    console.log('q',query);
    if(this.state.dataset) {
      this.setState({queryObj: query, isFeching: true});
      let res = this.state.dataset.query(query).then(this.onData.bind(this));
      console.log('q-A', res);
      return res;
    } else {
      throw new Error("Missing dataset. You need to use a backend to query against");
    }
  }

  onAction() {
    /* IMPLEMENT */
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
    this.setData(_data, handlers, e);
  }
  

  setData(data, handlers, e) {
    let _handlers = handlers || this.props.dataHandlers;
    let _data = data.hits || data;
    let _total = data.total || data.length;
    _data = DataHandler.handle.call(this, _handlers, _data, this.getGlobalData(), e);
    console.log('sD', this, data, handlers, e);
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
