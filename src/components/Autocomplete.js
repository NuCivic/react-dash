import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseFilter from './BaseFilter';
import ReactSelect from './ReactSelect';
import { makeKey } from '../utils/utils';

export default class Autocomplete extends BaseFilter {
  constructor(props) {
    super(props);
    this.state.actionType = "AUTOCOMPLETE_CHANGE";
    if (!this.state.key) {
      this.state.key = makeKey();
    }
  }  
  
  render(){
    let val = this.getFilterValue();
    let label = this.props.label || 'Filter Label';
    let labelClass = (this.props.label) ? '' : 'sr-only';
    let inputProps = {};
    
    inputProps.id = this.state.key;

    if (val && !this.props.multi) val = val[0];
    
    return (
      <div className='autocomplete-filter-container'>
        <label htmlFor={this.state.key} className={labelClass}>Filter Label</label>
        <ReactSelect.Async value={val} loadOptions={this.loadOptions.bind(this)} disabled={this.isDisabled()} {...this.props} onChange={this.onChange.bind(this)} key={this.state.key} inputProps={inputProps} />
      </div>
    );
  }
}

Registry.set('Autocomplete', Autocomplete);
