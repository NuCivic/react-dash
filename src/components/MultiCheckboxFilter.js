import React, { Component } from 'react';
import Registry from '../utils/Registry';
import BaseFilter from './BaseFilter';
import CheckboxFilter from '../ReactDashboard';
import { makeKey } from '../utils/utils';

export default class MultiCheckboxFilter extends BaseFilter {
  constructor(props) {
    super(props);
    this.state.actionType = "MULTICHECKBOX_CHANGE";
    this.state.elKey = makeKey();
    this.state.checked = this.state.checked || {};
  }

  checkboxClick(el) {
    let checked = Object.assign({}, this.state.checked);
    let filter = Object.assign({}, this.props);

    filter.actionType = this.state.actionType;

    if (checked[el.value] && checked[el.value] === true) {
      checked[el.value] = false;
    } else {
      checked[el.value] = true;
    }
    
    filter.value = Object.keys(checked).map(k => {
      if (checked[k]) return k;
    }).filter(k => { return k != undefined })

    this.setState({checked: checked});
    this.emit(filter);
  }

  render(){
      let val = this.getFilterValue();
      
      return (
        <ul className='react-dash-checkbox'>
          { this.props.options.map(el => {
            el.checked = this.state.checked[el.value];
            return (
              // figure out if it's checked
							 <li className='react-dash-checkbox-item'>
									<input
										type="checkbox"
										name={this.props.name}
                    value={el.value}
                    checked={el.checked}
										onChange={() => { this.checkboxClick(el) }}
									/>
									<label htmlFor={this.props.name} value={el.label}>
										{el.label}
									</label>
								</li>  
              );
            })
          }
        </ul>
      );
  }
}

Registry.set('MultiCheckboxFilter', MultiCheckboxFilter);
