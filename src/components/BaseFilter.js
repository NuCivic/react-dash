import React, { Component } from 'react';
import Registry from '../utils/Registry';
import { makeKey } from '../utils/utils';
import BaseComponent from './BaseComponent';
import { isArray } from 'lodash';

export default class BaseFilter extends BaseComponent {
  
  constructor(props) {
    super(props);
  }

  getFilterValue() {
    let val;

    if (this.isDisabled()) {
      return [];
    }

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
  
  /**
   * @@IMPLEMEMT
   */
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

  // Check if the filter is disabled
  // Filters can be disabled via props, or if a specified filter is present
  // in applied filters
  isDisabled() {
    let disabled = false;
    let appliedFilters = (this.props.appliedFilters) ? Object.keys(this.props.appliedFilters) : [];

    if (this.props.disabled) disabled = true;
    
    if (this.props.disabledBy) {
      this.props.disabledBy.forEach(field => {
        if (appliedFilters.indexOf(field) >= 0) disabled = true;
      });
    }

    return disabled;
  }

  /**
   * Load autocomplete options
   * @param  {String}   input A text with the query to be sent to the server
   * @return {Promise}        A promise with the request
   */
  loadOptions(input){
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
