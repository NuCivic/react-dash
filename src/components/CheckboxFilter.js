import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseFilter from './BaseFilter';
import ReactSelect from './ReactSelect';

export default class CheckboxFilter extends BaseFilter {
  constructor(props) {
    super(props);
    this.state.checked = this.state.checked || false;
    this.state.actionType = 'CHECKBOX_CHANGE';
  }

  onClick () {
    let payload = [{label: this.props.label, value: !this.state.checked}];
    this.setState({ checked: !this.state.checked });
    this.onChange(payload);
  }
 	
  render(){
    let val = this.getFilterValue();
		
    return (
       <span className='react-dash-checkbox'>
          <label for={this.props.name} value={this.props.label}>
            {this.props.label}
          </label>
          <input
            type="checkbox"
            name={this.props.name}
            value={this.state.checked}
            checked={this.state.checked}
            onClick={this.onClick.bind(this)}
          />
        </span>  
    );
  }
}

Registry.set('CheckboxFilter', CheckboxFilter);
