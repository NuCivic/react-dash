import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseFilter from './BaseFilter';
import ReactSelect from './ReactSelect';

export default class Autocomplete extends BaseFilter {
  constructor(props) {
    super(props);
    this.state.actionType = "AUTOCOMPLETE_CHANGE"
  }  
  
  render(){
    let val = this.getFilterValue();
    if (val && !this.props.multi) val = val[0];
    console.log('AC', val, this);
    return (
      <ReactSelect.Async value={val} loadOptions={this.loadOptions.bind(this)} {...this.props} onChange={this.onChange.bind(this)}/>
    );
  }
}

Registry.set('Autocomplete', Autocomplete);
