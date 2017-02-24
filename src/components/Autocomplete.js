import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseFilter from './BaseFilter';
import ReactSelect from './ReactSelect';
import { makeKey } from '../utils/utils';

export default class Autocomplete extends BaseFilter {
  constructor(props) {
    super(props);
    this.state.actionType = "AUTOCOMPLETE_CHANGE";
    this.state.elKey = makeKey();
  }  
  
  render(){
    let val = this.getFilterValue();
    
    if (val && !this.props.multi) val = val[0];
    
    return (
      <ReactSelect.Async value={val} key={this.state.elKey} loadOptions={this.loadOptions.bind(this)} disabled={this.isDisabled()} {...this.props} onChange={this.onChange.bind(this)}/>
    );
  }
}

Registry.set('Autocomplete', Autocomplete);
