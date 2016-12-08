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

// @@TODO - generalize filter functionality, this should not need to be autocomplete
// @@TODO - any input element should work as filter component by inheriting from superclass
export default class Autocomplete extends BaseComponent {

  getFilterValue() {
    let val;
    //console.log('getFilter', this);
    if (this.props.appliedFilters && this.props.appliedFilters[this.props.field]) {
      val = this.props.appliedFilters[this.props.field].value;
      //console.log('ac-gf-0', val, this);
    } else if (this.props.initVal) {
      val = this.props.defaultValue;
      //console.log('ac-gf-1', val, this);
    } else if (this.props.options) {
      val = this.props.options[0].value;
      //console.log('ac-gf-2', val, this);
    } else if (this.state.data && this.state.data[0]) {
      val = this.state.data[0][0].value.values;
      //console.log('ac-gf-3',  val, this);
    }


    //if (!isArray(val)) val = [val];

    //console.log('ac-gf-F', val, this);
    return val;
  }
  
  onFilter() {
    // noop / overrides basecomponent onFilte
  }
  
  onChange(e) {
    this.onFilter(e);
    
    let filter = Object.assign({}, this.props);
    
    filter.value = e;
    filter.actionType = 'AUTOCOMPLETE_CHANGE';
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
  
  render(){
    let val = this.getFilterValue();
    if (!this.props.multi) val = val[0];
    return (
      <ReactSelect.Async value={val} loadOptions={this.loadOptions.bind(this)} {...this.props} onChange={this.onChange.bind(this)}/>
    );
  }
}

Registry.set('Autocomplete', Autocomplete);
