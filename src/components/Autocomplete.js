/**
 * This component is based in the react-select component https://github.com/JedWatson/react-select
 * It adds the ability to pass only the url from where options are get.
 * Url should have the following format: http://localhost:3004/options?q={{keyword}}
 * Keyword is the string to be sent to the server and retrive the available options
 * for that word.
 *
 * You can override all the available properties of the original component.
 * For more documentation about  this component please go
 * to https://github.com/JedWatson/react-select
 */

import React, { Component } from 'react';
import Registry from '../utils/Registry';
import {makeKey} from '../utils/utils';
import BaseComponent from './BaseComponent';
import ReactSelect from './ReactSelect';
import { isArray } from 'lodash';

export default class Autocomplete extends BaseComponent {

  getFilterValue() {
    let val;
    if (this.props.appliedFilters && this.props.appliedFilters[this.props.field]) {
      val = this.props.appliedFilters[this.props.field];
    } else if (this.props.defaultValue) {
      val = this.props.defaultValue;
    } else {
      val = this.props.options[0].value;
    }

    if (!isArray(val)) val = [val];
    return val;
  
  }
  
  onFilter() {
    // noop / overrides basecomponent onFilte
  }
  
  onChange(e) {
    // @@TODO wire param routing to Autocomplete!
    // Currently this overrides onFilter in BaseComponent
    // which does param handling
    
    this.onFilter(e);

    this.emit({
      actionType: 'AUTOCOMPLETE_CHANGE',
      value: [e],
      field: this.props.field,
      fetch: this.props.fetch
    });
  }

  /**
   * Load autocomplete options
   * @param  {String}   input A text with the query to be sent to the server
   * @param  {Function} cb    Callback to be called right after server response
   * @return {Promise}        A promise with the request
   */
  loadOptions(input, cb){
    let re = /\{\{(.+)\}\}/;
    if(this.props.url) {
      return fetch(this.props.url.replace(re, input))
        .then((response) => {
          return response.json();
        }).then((json) => {
          return { options: json };
        });
    } else if(this.props.options) {
      return Promise.resolve({options: this.props.options, isLoading: false});
    }
    return  Promise.resolve({options: [], isLoading: false});
  }
  
  render(){
    let val = this.getFilterValue();
    if (!this.props.multi) val = val[0];
    console.log('AC-Render', val, this);
    return (
      <ReactSelect.Async value={val} loadOptions={this.loadOptions.bind(this)} {...this.props} onChange={this.onChange.bind(this)}/>
    );
  }
}

Registry.set('Autocomplete', Autocomplete);
