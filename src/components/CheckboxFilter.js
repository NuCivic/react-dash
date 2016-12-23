import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseFilter from './BaseFilter';
import ReactSelect from './ReactSelect';

export default class CheckboxFilter extends BaseFilter {
  constructor(props) {
    super(props);
    this.state.checked = this.state.checked || false;
    this.state.value = (this.state.checked) ? this.props.value : null;
    this.state.actionType = 'AUTOCOMPLETE_CHANGE';
  }

  onClick () {
    let checked = !this.state.checked; // toggle checked state
    let payload;

    this.setState({ checked: checked });
    
    if (checked) {
      payload = [{label: this.props.label, value: this.props.value}];
    } else {
      payload = []; // pass empty payload value to reset filter
    }
    
    this.onChange(payload);
  }
 	
  render(){
    let val = this.getFilterValue();
		
    return (
       <span className='react-dash-checkbox'>
          <input
            type="checkbox"
            name={this.props.name}
            value={this.state.checked}
            checked={this.state.checked}
            onClick={this.onClick.bind(this)}
          />
          <label for={this.props.name} value={this.props.label}>
            {this.props.label}
          </label>
        </span>  
    );
  }
}

Registry.set('CheckboxFilter', CheckboxFilter);
