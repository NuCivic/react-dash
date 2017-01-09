import React, { Component } from 'react';
import Registry from '../utils/Registry';
import {makeKey} from '../utils/utils';
import BaseComponent from './BaseComponent';
import { isArray } from 'lodash';

export default class BaseFilter extends BaseComponent {

  getFilterValue() {
    let val;
    
    if (this.props.appliedFilters && this.props.appliedFilters[this.props.field]) {
      val = this.props.appliedFilters[this.props.field].value;
    } else if (this.props.initVal) {
      val = this.props.defaultValue;
    } else if (this.props.options) {
      val = this.props.options[0].value;
    } else if (this.state.data && this.state.data[0]) {
      val = this.state.data[0][0].value.values;
    }

    return val;
  }
  
  onFilter() {
    // noop / overrides basecomponent onFilter
  }
  
  onChange(e) {
    this.onFilter(e);
    
    let filter = Object.assign({}, this.props);
    
    filter.value = e;
    filter.multi = this.props.multi;
    filter.actionType = this.state.actionType;

    this.emit(filter);
  }

  /**
   * Load autocomplete options
   * @param  {String}   input A text with the query to be sent to the server
   * @param  {Function} cb    Callback to be called right after server response
   * @return {Promise}        A promise with the request
   */
  loadOptions(input, cb){
    let re = /\{\{(.+)\}\}/;

    // URL Endpoint returns filter options
    if(this.props.url) {
      return fetch(this.props.url.replace(re, input))
        .then((response) => {
          return response.json();
        }).then((json) => {
          return { options: json };
        });
    
    // Pass options directly
    } else if(this.props.options) {
      return Promise.resolve({ options: this.props.options, isLoading: false });
    // Use component level data
    } else if (this.props.data && this.props.data[0]) {
      let options = this.props.data[0];
      return Promise.resolve({ options: options, isLoading: false });
    }
    
    return  Promise.resolve({options: [], isLoading: false});
  }
}

Registry.set('BaseFilter', BaseFilter);
